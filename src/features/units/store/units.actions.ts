import axiosInstance from '@/api/api.interceptor'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUnit } from '../types'

export const getUnitsAction = createAsyncThunk<IUnit[]>(
	'units/getUnits',
	async () => {
		const response = await axiosInstance.get<IUnit[]>('/units')
		const data = response.data
		return data
	}
)

export const createUnitAction = createAsyncThunk<IUnit, any>(
	'units/createUnit',
	async name => {
		const response = await axiosInstance.post<IUnit>('/units', name)
		const data = response.data
		return data
	}
)

export const updateUnitAction = createAsyncThunk<
	IUnit,
	{ id: number; name: string }
>('units/updateUnit', async ({ id, name }) => {
	const response = await axiosInstance.put<IUnit>(`/units/${id}`, { name })
	const data = response.data
	return data
})

// delete action
export const deleteUnitAction = createAsyncThunk<number, number>(
	'units/deleteUnit',
	async (id, thunkAPI) => {
		await axiosInstance.delete(`/units/${id}`)
		thunkAPI.dispatch(getUnitsAction())
		return id
	}
)
