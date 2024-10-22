import { createEmployee, getEmployees } from './employees.actions'
import { createSlice } from '@reduxjs/toolkit'
import type { IEmployee } from '../types'
interface IInitialState {
  employees: IEmployee[]
  employee: IEmployee
  loading: boolean
  error: string
  isCreatingEmployee: boolean
}

const initialState: IInitialState = {
  employees: [],
  employee: {} as IEmployee,
  loading: false,
  error: '',
  isCreatingEmployee: false,
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.loading = false
      state.employees = action.payload
    })
    builder
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || ''
      })
      .addCase(createEmployee.pending, (state) => {
        state.isCreatingEmployee = true
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isCreatingEmployee = false
        state.employee = action.payload
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isCreatingEmployee = false
        state.error = action.error.message || ''
      })
  },
})
