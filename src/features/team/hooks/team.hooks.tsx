import {
	ColumnDef,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table'

import React from 'react'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import {
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
} from '@tanstack/react-table'
import { confirmAlert } from 'react-confirm-alert'
import toast from 'react-hot-toast'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import UpdateTeamForm from '../components/update-team-form'
import { deleteTeamAction } from '../store/team.actions'
import { ITeam } from '../types'

export const useTeamTableData = () => {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const { teams } = useAppSelector(state => state.team)
	const dispatch = useAppDispatch()
	const [selectedTeam, setSelectedTeam] = React.useState<ITeam | null>(null)

	const deleteTeam = (id: number) => {
		confirmAlert({
			title: 'Do you want delete this product?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						dispatch(deleteTeamAction(id) as any)
							.unwrap()
							.then(() => {
								toast.success('Team deleted successfully')
							})
							.catch(() => {
								toast.error('Error deleting team')
							})
					},
				},
				{
					label: 'No',
				},
			],
		})
	}

	const warehouseColumns: ColumnDef<ITeam>[] = [
		{
			accessorKey: 'id',
			header: 'ID',
			cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
		},
		{
			accessorKey: 'fullname',
			header: 'Fullname',
			cell: ({ row }) => (
				<div className='capitalize'>{row.original.fullName}</div>
			),
		},
		{
			accessorKey: 'phone',
			header: () => {
				return <div className='capitalize'>Phone</div>
			},
			cell: ({ row }) => (
				<div className='lowercase'>
					<>{row.getValue('phone')}</>{' '}
				</div>
			),
		},
		{
			accessorKey: 'actions',
			header: () => {
				return <div className='flex justify-end capitalize'>Actions</div>
			},
			cell: ({ row }) => (
				<div className='flex justify-end gap-2'>
					<Link to={`/team/${row.original.id}`}>
						<Button className='bg-blue-500 hover:bg-blue-600' size={'icon'}>
							<EyeOpenIcon />
						</Button>
					</Link>
					<Button
						onClick={() => {
							setSelectedTeam(row.original)
						}}
						className='bg-green-500 hover:bg-green-600'
						size={'icon'}
					>
						<BiEdit />
					</Button>
					<UpdateTeamForm
						initialData={row.original}
						setOpen={() => {
							setSelectedTeam(null)
						}}
						open={Boolean(selectedTeam?.id === row.original.id)}
					/>
					<Button
						onClick={() => {
							deleteTeam(row.original.id)
						}}
						className='bg-red-500 hover:bg-red-600'
						size={'icon'}
					>
						<BiTrash />
					</Button>
				</div>
			),
		},
	]
	const table = useReactTable({
		data: teams.length ? teams : [],
		columns: warehouseColumns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return table
}
