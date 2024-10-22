import { getWarehouseIncomesAction } from '@/features/wareouse-incomes/store/warehouse-incomes.actions'
import { IIncomeTransaction } from '@/features/wareouse-incomes/types'
import { PaginationResponse } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBasketProductItem, IProduct, IUnit } from '../types'
import {
	createProductAction,
	getWarehouseProductsAction,
	getWarehouseUnitsAction,
} from './warehouse.actions'

interface IInitialState {
	products: IProduct[]
	isWarehouseLoading: boolean
	units: IUnit[]
	isProductCreating: boolean
	basket: IBasketProductItem[]
	incomes: IIncomeTransaction[]
	currentPage: number
	totalPages: number
}

const initialState: IInitialState = {
	products: [],
	isWarehouseLoading: false,
	units: [],
	isProductCreating: false,
	basket: [],
	incomes: [],
	currentPage: 1,
	totalPages: 0,
}

const productwarehouseSlice = createSlice({
	name: 'warehouse',
	reducers: {
		addToBasket: (state, action: PayloadAction<IBasketProductItem>) => {
			state.basket = [...state.basket, action.payload]
		},
		removeFromBasket: (state, action: PayloadAction<{ id: number }>) => {
			state.basket = state.basket.filter(item => item.id !== action.payload.id)
		},
		changeBasketItemQuantity: (
			state,
			action: PayloadAction<{ id: number; quantity: number }>
		) => {
			const index = state.basket.findIndex(
				item => item.id === action.payload.id
			)

			if (index === -1) return

			state.basket[index].add_quantity = action.payload.quantity
		},
		setIncomesPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
	},
	initialState,
	extraReducers: builder => {
		builder
			.addCase(getWarehouseProductsAction.pending, state => {
				state.isWarehouseLoading = true
			})
			.addCase(
				getWarehouseProductsAction.fulfilled,
				(state, action: PayloadAction<IProduct[]>) => {
					state.products = action.payload
					state.isWarehouseLoading = false
				}
			)
			.addCase(getWarehouseProductsAction.rejected, state => {
				state.isWarehouseLoading = false
			})
			.addCase(getWarehouseUnitsAction.pending, state => {
				state.isWarehouseLoading = true
			})
			.addCase(
				getWarehouseUnitsAction.fulfilled,
				(state, action: PayloadAction<IUnit[]>) => {
					state.units = action.payload
					state.isWarehouseLoading = false
				}
			)
			.addCase(getWarehouseUnitsAction.rejected, state => {
				state.isWarehouseLoading = false
			})
			.addCase(createProductAction.pending, state => {
				state.isProductCreating = true
			})
			.addCase(createProductAction.fulfilled, state => {
				state.isProductCreating = false
			})
			.addCase(createProductAction.rejected, state => {
				state.isProductCreating = false
			})
			.addCase(getWarehouseIncomesAction.pending, state => {
				state.isProductCreating = true
			})
			.addCase(
				getWarehouseIncomesAction.fulfilled,
				(
					state,
					action: PayloadAction<PaginationResponse<IIncomeTransaction>>
				) => {
					state.isProductCreating = false
					state.incomes = action.payload.data
					state.totalPages = action.payload.totalPages
				}
			)
			.addCase(getWarehouseIncomesAction.rejected, state => {
				state.isProductCreating = false
			})
	},
})

export const {
	addToBasket,
	changeBasketItemQuantity,
	removeFromBasket,
	setIncomesPage,
} = productwarehouseSlice.actions

export default productwarehouseSlice
