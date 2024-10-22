import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder } from '../types'
import { getOrdersAction } from './orders.actions'

interface IOrderInitialState {
	orders: IOrder[]
	isOrdersLoading: boolean
	currentPage: number
	totalPages: number
}

const initialState: IOrderInitialState = {
	orders: [],
	isOrdersLoading: false,
	currentPage: 1,
	totalPages: 0,
}

export const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		setOrderPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getOrdersAction.pending, state => {
				state.isOrdersLoading = true
			})
			.addCase(getOrdersAction.fulfilled, (state, action) => {
				console.log(action.payload)
				state.orders = action.payload.data
				state.totalPages = action.payload.totalPages
				state.isOrdersLoading = false
			})
			.addCase(getOrdersAction.rejected, state => {
				state.isOrdersLoading = false
			})
	},
})

export const { setOrderPage } = ordersSlice.actions
