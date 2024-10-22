'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { flexRender } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { TablePagination } from '@/components/ui/custom-pagination'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { setIncomesPage } from '@/features/products/store/warehouse.slice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect, useState } from 'react'
import { BiBasket } from 'react-icons/bi'
import useWarehouseTableData from '../hooks/use-warehouse-table-data'
import { getWarehouseIncomesAction } from '../store/warehouse-incomes.actions'
export function WarehouseIncomesTable() {
	const table = useWarehouseTableData()
	const dispatch = useAppDispatch()
	const { basket } = useAppSelector(state => state.warehouse)
	const { totalPages, currentPage } = useAppSelector(
		state => state.productwarehouseSlice
	)
	const [basketIsOpen, setbasket] = useState(false)

	useEffect(() => {
		dispatch(getWarehouseIncomesAction({ page: currentPage }) as any)
	}, [currentPage])

	return (
		<div className='w-full'>
			<div className='flex items-center justify-between gap-4 pb-4'>
				<Input
					placeholder='Filter product...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>

				<div className='flex gap-4'>
					<Button
						onClick={() => setbasket(true)}
						size={'icon'}
						variant={'outline'}
						className='relative'
					>
						<BiBasket className='text-xl' />{' '}
						{basket.length > 0 ? (
							<span className='absolute rounded-md px-1 py-1 text-xs text-white bg-amber-600 top-[-6px] right-[-30%]'>
								({basket.length})
							</span>
						) : null}
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' className='ml-auto'>
								Columns <ChevronDownIcon className='w-4 h-4 ml-2' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{table
								.getAllColumns()
								.filter(column => column.getCanHide())
								.map(column => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={value =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className='border rounded-md'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={4} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				<TablePagination
					totalCount={totalPages}
					current={currentPage}
					setCurrent={(page: number) => {
						dispatch(setIncomesPage(page))
					}}
				/>
			</div>
		</div>
	)
}
