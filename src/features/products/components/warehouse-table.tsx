'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addToChangePrice } from '@/features/warehouse/store/warehouse.slice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import toast from 'react-hot-toast'
import { BiEdit, BiTrash } from 'react-icons/bi'
import useProductsTableData from '../hooks/use-warehouse-table-data'
import {
	deleteProduct as deleteProductAction,
	getWarehouseProductsAction,
	updateProductAction,
} from '../store/warehouse.actions'
import { IProduct } from '../types'
import { AddProductDrawer } from './add-product-drawer'
import { UpdateProductDrawer } from './update-product-form'

export function ProductsTable() {
	const table = useProductsTableData()
	const dispatch = useAppDispatch()
	const { products } = useAppSelector(state => state.warehouse)
	const [updateProduct, setUpdateProduct] = useState<IProduct | null>(null)

	useEffect(() => {
		dispatch(getWarehouseProductsAction())
	}, [])

	const deleteProduct = (product_id: string) => {
		confirmAlert({
			title: 'Do you want delete this product?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						dispatch(deleteProductAction({ product_id })).then(res => {
							if (res.type === 'warehouse/delete-product/fulfilled') {
								toast.success('Product deleted successfully!')
								dispatch(getWarehouseProductsAction())
							}
						})
					},
				},
				{
					label: 'No',
				},
			],
		})
	}

	function updatePrice(id: number, price: number, sellPrice: number) {
		dispatch(updateProductAction({ id, price, sellPrice })).then(res => {
			if (res.type === 'warehouse/update-product/fulfilled') {
				toast.success('Product updated successfully!')
			}
		})
	}

	return (
		<div className='w-full '>
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
					<AddProductDrawer />
				</div>
			</div>
			<div className='overflow-x-auto border rounded-md'>
				<table className='w-full border border-gray-200'>
					<thead className='w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 '>
						<tr>
							<th className='py-[15px] px-[20px]'>ID</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Product
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Unit
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Price
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Sell Price
							</th>
							<th className='py-[15px] px-[20px]'></th>
						</tr>
					</thead>
					<tbody>
						{products.map(item => (
							<tr key={item.id}>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200'>
									<div className='capitalize'>{item.id}</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{item.name}
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{item.unit?.name || '--'}
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									<div className='flex justify-center font-medium text-right'>
										<Input
											className='min-w-[100px] max-w-[200px]'
											value={item.price}
											type='number'
											onChange={e => {
												dispatch(
													addToChangePrice({
														id: item.id,
														new_price: +e.target.value,
													})
												)
											}}
										/>
									</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									<div className='flex justify-center font-medium text-right'>
										<Input
											className='min-w-[100px] max-w-[200px] '
											value={item.sellPrice}
											type='number'
											onChange={e => {
												dispatch(
													addToChangePrice({
														id: item.id,
														new_sell_price: +e.target.value,
													})
												)
											}}
										/>
									</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200  gap-2'>
									<div className='flex items-center justify-center gap-2'>
										<Button
											onClick={() => {
												updatePrice(item.id, item.price, item.sellPrice)
											}}
											className='bg-green-500 hover:bg-green-600 '
											size={'icon'}
											disabled={
												(item.price === item.old_price &&
													item.sellPrice === item.old_sell_price) ||
												item.price < 0 ||
												item.sellPrice < 0
											}
										>
											<CheckCircleIcon />
										</Button>

										<div className='h-8 w-[1px] bg-slate-200 mx-2' />
										<Button
											onClick={() => {
												setUpdateProduct(item)
											}}
											size={'icon'}
											className='w-8 h-8 bg-blue-500 hover:bg-blue-600'
										>
											<BiEdit className='text-xl' />
										</Button>

										<div className='h-8 w-[1px] bg-slate-200 mx-2' />
										<Button
											onClick={() => {
												deleteProduct(String(item.id))
											}}
											size={'icon'}
											className='w-8 h-8 bg-red-500 hover:bg-red-600'
										>
											<BiTrash className='text-xl' />
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<UpdateProductDrawer
				initialData={updateProduct!}
				open={Boolean(updateProduct)}
				setOpen={() => setUpdateProduct(null)}
			/>
		</div>
	)
}
