import axiosInstance from '@/api/api.interceptor'
import { PaginationResponse } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IIncomeTransaction } from '../types'

export const getWarehouseIncomesAction = createAsyncThunk<
	PaginationResponse<IIncomeTransaction>,
	{ page: number }
>('warehouse/incomes', async ({ page }, thunkAPI) => {
	try {
		const response = await axiosInstance.get<
			PaginationResponse<IIncomeTransaction>
		>(`/income-product?page=${page || 1}`)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})
