import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { saveTokens } from '../lib/save-tokens'
import { ILoginResponse, IUser } from '../types'
import { loginAction, refreshAction } from './auth.actions'

interface IInitialState {
	user: IUser | null
	isAuthLoading: boolean
}

const initialState: IInitialState = {
	user: null,
	isAuthLoading: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loginAction.pending, state => {
				state.isAuthLoading = true
			})
			.addCase(
				loginAction.fulfilled,
				(state, action: PayloadAction<ILoginResponse>) => {
					state.user = action.payload.user
					saveTokens(action.payload.accessToken, action.payload.refreshToken)
					state.isAuthLoading = false
				}
			)
			.addCase(loginAction.rejected, state => {
				state.isAuthLoading = false
			})
			.addCase(refreshAction.pending, state => {
				state.isAuthLoading = true
			})
			.addCase(
				refreshAction.fulfilled,
				(state, action: PayloadAction<ILoginResponse>) => {
					state.user = action.payload.user
					saveTokens(action.payload.accessToken, action.payload.refreshToken)
					state.isAuthLoading = false
				}
			)
			.addCase(refreshAction.rejected, state => {
				state.isAuthLoading = false
			})
	},
})
