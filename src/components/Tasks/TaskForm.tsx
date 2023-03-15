import { useState } from 'react'
import { toast } from 'react-toastify'
import { Input, Switch, Space, Modal, Layout } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import { editTask, newTask } from 'api/tasks'
import { TaskType } from '.'

interface TaskProps {
  task: TaskType
  tasks: TaskType[]
  isModalOpen: boolean
  setTasks: (args: TaskType[]) => void
  setIsModalOpen: (args: boolean) => void
}

const TaskForm = ({ task, tasks, setTasks, isModalOpen, setIsModalOpen }: TaskProps) => {
  const [title, setTitle] = useState(task.title ?? '')
  const [description, setDescription] = useState(task.description ?? '')
  const [completed, setCompleted] = useState(task.completed ?? false)

  const submitRequest = async () => {
    const data = {
      title: title,
      description: description,
      completed: completed
    }
    task?._id ? editCurrentTask(data) : createTask(data)
  }

  const editCurrentTask = async (data: TaskType) => {
    data._id = task._id
    editTask(data).then(() => {
      const updatedTasks = tasks.map(task =>
        task._id === data._id ? { ...data } : task
      )
      setTasks(updatedTasks)
    })
  }

  const createTask = async (data: TaskType) => {
    await newTask(data).then((task) => {
      const updatedTasks = [task, ...tasks]
      setTasks(updatedTasks)
    }).catch((e) => toast.error(e.response.data.message))
  }

  const handleOk = () =>{
    setIsModalOpen(false)
    submitRequest()
  }

  const handleCancel = () => setIsModalOpen(false)

  return (
    <Layout className='input-form'>
      {isModalOpen &&
        <Modal title='Task Form' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Space direction='vertical' className='width-100'>
            <Space className='d-flex justify-space-between width-100'>
              <p>Enter Title:</p>
              <Input
                placeholder='Title'
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
            </Space>

            <Space className='d-flex justify-space-between width-100'>
              <p>Enter Description:</p>
              <Input
                placeholder='Description'
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              />
            </Space>

            <Space className='d-flex justify-space-between width-100'>
              <p>Task Completed?</p>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                checked={completed}
                onChange={() => setCompleted(!completed)}
              />
            </Space>
          </Space>
        </Modal>
      }
    </Layout>
  )
}

export default TaskForm
