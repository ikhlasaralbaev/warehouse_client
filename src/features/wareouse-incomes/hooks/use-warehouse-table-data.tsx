import {
	ColumnDef,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table'

import React from 'react'

import { useAppSelector } from '@/hooks'
import {
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
} from '@tanstack/react-table'
import moment from 'moment'
import { IIncomeTransaction } from '../types'

const useWarehouseTableData = () => {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const { incomes } = useAppSelector(state => state.productwarehouseSlice)

	const warehouseColumns: ColumnDef<IIncomeTransaction>[] = [
		{
			accessorKey: 'id',
			header: 'ID',
			cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
		},
		{
			accessorKey: 'product.name',
			header: 'Product',
			cell: ({ row }) => (
				<div className='capitalize'>{row.original.product.name}</div>
			),
		},
		{
			accessorKey: 'quantity',
			header: () => {
				return <div className='capitalize'>Quantity</div>
			},
			cell: ({ row }) => (
				<div className='lowercase'>
					<>{Number(row.getValue('quantity') || 0)?.toLocaleString()}</>{' '}
				</div>
			),
		},
		{
			accessorKey: 'createdBy',
			header: () => {
				return <div className='capitalize'>Creator</div>
			},
			cell: ({ row }) => (
				<div className='lowercase'>
					<b>{row.original.createdBy.email}</b>{' '}
				</div>
			),
		},
		{
			accessorKey: 'price',
			header: () => <div className='text-right'>Date</div>,
			cell: ({ row }) => {
				return (
					<div className='font-medium text-right'>
						{moment(row.original.createdAt).format('DD/MM/YYYY HH:mm:ss')}
					</div>
				)
			},
		},
	]
	const table = useReactTable({
		data: incomes,
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

export default useWarehouseTableData
