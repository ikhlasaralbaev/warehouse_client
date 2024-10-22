import { createSlice } from '@reduxjs/toolkit'
import { IUnit } from '../types'
import { getUnitsAction } from './units.actions'

interface IInitialState {
	units: IUnit[]
	isUnitsLoading: boolean
}

const initialState: IInitialState = {
	units: [],
	isUnitsLoading: false,
}

export const unitsSlice = createSlice({
	name: 'units',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getUnitsAction.pending, state => {
			state.isUnitsLoading = true
		})
		builder.addCase(getUnitsAction.fulfilled, (state, action) => {
			state.units = action.payload
			state.isUnitsLoading = false
		})
		builder.addCase(getUnitsAction.rejected, state => {
			state.isUnitsLoading = false
		})
	},
})
