import { useState, useEffect } from 'react'
import { Button, Layout, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { toast } from 'react-toastify'

import { getAllTasks, deleteTask } from 'api/tasks'
import { DEFAULT_TASK_VALUES } from 'Constants'
import TaskForm from './TaskForm'

import './styles.sass'

export interface TaskType {
  _id?: string | undefined
  title: string
  description: string
  completed: boolean
}

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(DEFAULT_TASK_VALUES)
  const [tasks, setTasks] = useState<TaskType[]>([])

  useEffect(() => {
    getAllTasks().then((data) => setTasks(data))
  }, [])

  const columns: ColumnsType<TaskType> = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      sorter: (a, b) => Number(a.completed) - Number(b.completed),
      render: (completed) => completed ? 'Completed' : 'In-Complete'
    },
    {
      title: 'Action',
      key: 'action',
      render: (task, _, index) => (
        <Space size='middle'>
          <a onClick={() => editTask(task)}>Edit</a>
          <a onClick={() => handleDeleteTask(task._id, index)}>Delete</a>
        </Space>
      )
    }
  ]
  const handleDeleteTask = (taskId: number, index: number) => {
    deleteTask(taskId).then(() => {
      const newTasks = [...tasks]
      newTasks.splice(index, 1)
      setTasks(newTasks)
    }).catch(() => toast.error('Something went wrong'))
  }

  const editTask = (task: TaskType) => {
    setTaskToEdit(task)
    setIsModalOpen(true)
  }

  const createTask = () => {
    setTaskToEdit(DEFAULT_TASK_VALUES)
    setIsModalOpen(true)
  }

  return (
    <Layout className='tasks-home'>
      <Space direction='vertical'>
        <h2 className='heading'>Tasks Manager</h2>

        <Button type='primary' onClick={createTask}>
          Add New Task
        </Button>

        <Table columns={columns} dataSource={tasks} rowKey='_id'/>

        {isModalOpen &&
          <TaskForm
            task={taskToEdit}
            tasks={tasks}
            setTasks={setTasks}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        }
      </Space>
    </Layout>
  )
}

export default Tasks
