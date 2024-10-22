import { updateProductAction } from '@/features/products/store/warehouse.actions'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBasketProductItem, IProduct, IProductDetails, IUnit } from '../types'
import {
	createProductAction,
	getProductDetails,
	getWarehouseProductsAction,
	getWarehouseUnitsAction,
} from './warehouse.actions'

export interface IPriceChanges {
	id: number
	old_price: number
	new_price: number
	old_sell_price: number
	new_sell_price: number
}

interface IInitialState {
	products: IProduct[]
	isWarehouseLoading: boolean
	units: IUnit[]
	isProductCreating: boolean
	basket: IBasketProductItem[]
	productDetails: IProductDetails | null
}

const initialState: IInitialState = {
	products: [],
	isWarehouseLoading: false,
	units: [],
	isProductCreating: false,
	basket: [],
	productDetails: null,
}

const warehouseSlice = createSlice({
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
		addToChangePrice: (
			state,
			action: PayloadAction<Partial<IPriceChanges>>
		) => {
			state.products = state.products.map(product => {
				if (product.id === action.payload.id) {
					return {
						...product,
						price:
							action.payload.new_price === undefined
								? product.price
								: action.payload.new_price,
						sellPrice:
							action.payload.new_sell_price === undefined
								? product.sellPrice
								: action.payload.new_sell_price,
					}
				}

				return product
			})
		},
		clearBasket: state => {
			state.basket = []
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
					state.products = action.payload.map(product => ({
						...product,
						old_price: product.price,
						old_sell_price: product.sellPrice,
					}))
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

			.addCase(getProductDetails.pending, state => {
				state.isWarehouseLoading = true
			})
			.addCase(
				getProductDetails.fulfilled,
				(state, action: PayloadAction<IProductDetails>) => {
					state.productDetails = action.payload
					state.isWarehouseLoading = false
				}
			)
			.addCase(getProductDetails.rejected, state => {
				state.isWarehouseLoading = false
			})
			.addCase(updateProductAction.pending, state => {
				state.isProductCreating = true
			})
			.addCase(
				updateProductAction.fulfilled,
				(state, action: PayloadAction<IProduct>) => {
					state.isProductCreating = false
					const data = state.products
					const index = data.findIndex(
						product => product.id === action.payload.id
					)

					if (index === -1) return

					data[index] = {
						...state.products[index],
						...action.payload,
						price: action.payload.price,
						sellPrice: action.payload.sellPrice,
						old_price: action.payload.price,
						old_sell_price: action.payload.sellPrice,
					}

					state.products = data
				}
			)
			.addCase(updateProductAction.rejected, state => {
				state.isProductCreating = false
			})
	},
})

export const {
	addToBasket,
	changeBasketItemQuantity,
	removeFromBasket,
	addToChangePrice,
	clearBasket,
} = warehouseSlice.actions

export default warehouseSlice
