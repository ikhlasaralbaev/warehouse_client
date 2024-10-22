import axiosInstance from '@/api/api.interceptor'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProduct, IUnit } from '../types'

export const getWarehouseProductsAction = createAsyncThunk<IProduct[]>(
	'warehouse/list',
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get<IProduct[]>('/products')
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const getWarehouseUnitsAction = createAsyncThunk<IUnit[]>(
	'warehouse/units',
	async (_, thunkAPI) => {
		try {
			const response = await axiosInstance.get<IUnit[]>('/units')
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const createProductAction = createAsyncThunk<IUnit, any>(
	'warehouse/create-product',
	async (data, thunkAPI) => {
		try {
			const response = await axiosInstance.post<IUnit>('/products', data)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const incomeProduct = createAsyncThunk<{ product: IProduct }, any>(
	'warehouse/income-product',
	async (data, thunkAPI) => {
		try {
			const response = await axiosInstance.post<{ product: IProduct }>(
				'/income-product',
				data
			)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
export const deleteProduct = createAsyncThunk<any, { product_id: string }>(
	'warehouse/delete-product',
	async (data, thunkAPI) => {
		try {
			const response = await axiosInstance.delete(
				`/products/${data.product_id}`
			)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const updateProductAction = createAsyncThunk<IProduct, any>(
	'warehouse/update-product',
	async (data, thunkAPI) => {
		try {
			const response = await axiosInstance.patch<IProduct>(
				`/products/${data.id}`,
				data
			)
			console.log(response.data)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
