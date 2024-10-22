import axiosInstance from '@/api/api.interceptor'
import { PaginationResponse } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IOrder } from '../types'

export const getOrdersAction = createAsyncThunk<
	PaginationResponse<IOrder>,
	{ page: number }
>('orders/getOrders', async ({ page }) => {
	const response = await axiosInstance.get<PaginationResponse<IOrder>>(
		`/transactions?page=${page || 1}`
	)
	const data = response.data
	return data
})
