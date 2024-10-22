import { PaginationResponse } from './../../../types/index'
import { getAllPermissions, getRoleDetails, getRoles } from './roles.actions'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IPermission, IRole, IRoleDetails } from '../types'

interface IRoleINitialState {
  roles: IRole[]
  loading: boolean
  error: any
  totalPages?: number
  currentPage?: number
  permissions: IPermission[]
  isPermissionLoading: boolean
  roleDetails: IRoleDetails | null
}

const initialState: IRoleINitialState = {
  roles: [],
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  permissions: [],
  isPermissionLoading: false,
  roleDetails: null,
}

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setRolesCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoles.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      getRoles.fulfilled,
      (state, action: PayloadAction<PaginationResponse<IRole>>) => {
        state.loading = false
        state.roles = action.payload.data
        state.totalPages = action.payload.totalPages
      }
    )
    builder
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(getAllPermissions.pending, (state) => {
        state.isPermissionLoading = true
      })
      .addCase(getAllPermissions.fulfilled, (state, action) => {
        state.isPermissionLoading = false
        state.permissions = action.payload
      })
      .addCase(getAllPermissions.rejected, (state, action) => {
        state.isPermissionLoading = false
        state.error = action.error
      })
      .addCase(getRoleDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getRoleDetails.fulfilled, (state, action) => {
        state.loading = false
        state.roleDetails = action.payload
      })
      .addCase(getRoleDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
  },
})

export const { setRolesCurrentPage } = rolesSlice.actions

export default rolesSlice
