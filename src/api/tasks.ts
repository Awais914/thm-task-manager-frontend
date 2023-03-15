import { toast } from 'react-toastify'
import { TaskType } from 'components/Tasks'
import { apiClient } from './apiClient'

export const deleteTask = (taskId: number) =>
  apiClient
    .delete(`/task/${taskId}`)
    .then(() => toast.success('Successfully Deleted'))

export const editTask = async (data: TaskType) =>
  apiClient
    .put(`/task`, data)
    .then((response) => response.data)
    .catch(() => toast.error('Something went wrong'))

export const newTask = async (data: TaskType) =>
  apiClient
    .post(`/task`, data)
    .then((response) => response.data)

export const getAllTasks = () =>
  apiClient
    .get(`/task`)
    .then((response) => response.data)
