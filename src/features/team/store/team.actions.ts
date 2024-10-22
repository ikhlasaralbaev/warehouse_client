import axiosInstance from '@/api/api.interceptor'
import { PaginationResponse } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICreateTeam, ITeam, ITeamDetails } from '../types'

export const getTeamsAction = createAsyncThunk<
	PaginationResponse<ITeam>,
	{ page: number }
>('team/fetchTeams', async ({ page }) => {
	const response = await axiosInstance.get(`/teams?page=${page || 1}`)
	return response.data
})

export const createTeamAction = createAsyncThunk<ITeam, ICreateTeam>(
	'team/createTeam',
	async team => {
		const response = await axiosInstance.post('/teams', team)
		return response.data
	}
)

export const updateTeamAction = createAsyncThunk<
	ITeam,
	{ data: ICreateTeam; id: number }
>('team/updateTeam', async (team, thunkAPI) => {
	const response = await axiosInstance.patch(`/teams/${team.id}`, team.data)
	thunkAPI.dispatch(getTeamsAction({ page: 1 }))
	return response.data
})

export const deleteTeamAction = createAsyncThunk<number, number>(
	'team/deleteTeam',
	async id => {
		await axiosInstance.delete(`/teams/${id}`)
		return id
	}
)

export const getTeamDetailsAction = createAsyncThunk<
	ITeamDetails,
	{ id: number }
>('team/fetchTeamDetails', async id => {
	const response = await axiosInstance.get(`/teams/${id.id}`)
	return response.data
})
