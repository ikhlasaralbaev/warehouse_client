import { PaginationResponse } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITeam, ITeamDetails } from '../types'
import {
	createTeamAction,
	deleteTeamAction,
	getTeamDetailsAction,
	getTeamsAction,
} from './team.actions'

interface ITeamState {
	teams: ITeam[]
	isTeamsLoading: boolean
	error: string | null
	teamDetails: ITeamDetails | null
	totalPages: number
	currentPage: number
	search: string
}

const initialState: ITeamState = {
	teams: [],
	isTeamsLoading: false,
	error: null,
	teamDetails: null,
	totalPages: 0,
	currentPage: 1,
	search: '',
}

export const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload
		},
		setTeamPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getTeamsAction.pending, state => {
				state.isTeamsLoading = true
				state.error = null
			})
			.addCase(
				getTeamsAction.fulfilled,
				(state, action: PayloadAction<PaginationResponse<ITeam>>) => {
					state.teams = action.payload.data
					state.totalPages = action.payload.totalPages
					state.isTeamsLoading = false
				}
			)
			.addCase(getTeamsAction.rejected, (state, action) => {
				state.isTeamsLoading = false
				state.error = action.error.message || 'An error occurred'
			})
			.addCase(createTeamAction.pending, state => {
				state.isTeamsLoading = true
				state.error = null
			})
			.addCase(
				createTeamAction.fulfilled,
				(state, action: PayloadAction<ITeam>) => {
					state.teams.unshift(action.payload)
					state.isTeamsLoading = false
				}
			)
			.addCase(createTeamAction.rejected, (state, action) => {
				state.isTeamsLoading = false
				state.error = action.error.message || 'An error occurred'
			})
			.addCase(deleteTeamAction.pending, state => {
				state.isTeamsLoading = true
				state.error = null
			})
			.addCase(deleteTeamAction.fulfilled, (state, action) => {
				state.teams = state.teams.filter(team => team.id !== action.payload)
				state.isTeamsLoading = false
			})
			.addCase(deleteTeamAction.rejected, (state, action) => {
				state.isTeamsLoading = false
				state.error = action.error.message || 'An error occurred'
			})
			.addCase(getTeamDetailsAction.pending, state => {
				state.isTeamsLoading = true
				state.error = null
			})
			.addCase(
				getTeamDetailsAction.fulfilled,
				(state, action: PayloadAction<ITeamDetails>) => {
					state.teamDetails = action.payload
					state.isTeamsLoading = false
				}
			)
			.addCase(getTeamDetailsAction.rejected, (state, action) => {
				state.isTeamsLoading = false
				state.error = action.error.message || 'An error occurred'
			})
	},
})

export const { setSearch, setTeamPage } = teamSlice.actions
