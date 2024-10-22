import { IRole, type IPermission, type IRoleDetails } from './../types/index'
import axiosInstance from '@/api/api.interceptor'
import type { PaginationResponse } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
export const getRoles = createAsyncThunk<PaginationResponse<IRole>>(
  'roles/getRoles',
  async () => {
    const response = await axiosInstance.get('/roles')
    return response.data
  }
)

export const getAllPermissions = createAsyncThunk<IPermission[]>(
  'roles/getPermissions',
  async () => {
    const response = await axiosInstance.get<IPermission[]>(`/permissions`)
    return response.data
  }
)

export const createRole = createAsyncThunk<IRole, any>(
  'roles/createRole',
  async (role, thunkAPI) => {
    const response = await axiosInstance.post('/roles', role)
    thunkAPI.dispatch(getRoles() as any)
    return response.data
  }
)

export const updateRole = createAsyncThunk<IRole, any>(
  'roles/updateRole',
  async (role, thunkAPI) => {
    const response = await axiosInstance.put(`/roles/${role.id}`, role)
    thunkAPI.dispatch(getRoles() as any)
    return response.data
  }
)

export const getRoleDetails = createAsyncThunk<IRoleDetails, number>(
  'roles/getRoleDetails',
  async (id) => {
    const response = await axiosInstance.get(`/roles/${id}`)
    return response.data
  }
)
