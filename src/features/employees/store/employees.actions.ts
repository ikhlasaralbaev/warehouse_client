import axiosInstance from '@/api/api.interceptor'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { IEmployee } from '../types'
export const getEmployees = createAsyncThunk<IEmployee[]>(
  'employees/getEmployees',
  async () => {
    const response = await axiosInstance.get('/users')
    return response.data
  }
)

export const createEmployee = createAsyncThunk<IEmployee, any>(
  'employees/createEmployee',
  async (employee, thunkAPI) => {
    const response = await axiosInstance.post('/users', employee)
    thunkAPI.dispatch(getEmployees() as any)
    return response.data
  }
)

export const updateEmployee = createAsyncThunk<IEmployee, any>(
  'employees/updateEmployee',
  async (employee, thunkAPI) => {
    const response = await axiosInstance.put(`/users/${employee.id}`, employee)
    thunkAPI.dispatch(getEmployees() as any)
    return response.data
  }
)

export const deleteEmployee = createAsyncThunk<IEmployee, number>(
  'employees/deleteEmployee',
  async (id, thunkAPI) => {
    const response = await axiosInstance.delete(`/users/${id}`)
    thunkAPI.dispatch(getEmployees() as any)
    return response.data
  }
)
