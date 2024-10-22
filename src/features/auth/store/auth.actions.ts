import axiosInstance from '@/api/api.interceptor'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { refreshTokenKey } from '../lib/save-tokens'
import { ILoginResponse } from '../types'

export const loginAction = createAsyncThunk<ILoginResponse, any>(
	'auth/login',
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post('/auth/login', data)
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const refreshAction = createAsyncThunk<ILoginResponse>(
	'auth/refresh',
	async (_, thunkAPI) => {
		try {
			const token = localStorage.getItem(refreshTokenKey)

			const res = await axiosInstance.post('/auth/refresh', {
				refreshToken: token,
			})
			return res.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)
