'use client'

import { EyeOpenIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useEffect, useState } from 'react'
import { BiBasket, BiCartAdd, BiCheckCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import useWarehouseTableData from '../hooks/use-warehouse-table-data'
import { getWarehouseProductsAction } from '../store/warehouse.actions'
import { addToBasket } from '../store/warehouse.slice'
import BasketDrawer from './basket-drawer'
import { ImportProductDrawer } from './import-product-drawer'

export function WarehouseTable() {
	const table = useWarehouseTableData()
	const dispatch = useAppDispatch()
	const { basket, products } = useAppSelector(state => state.warehouse)
	const [basketIsOpen, setbasket] = useState(false)

	useEffect(() => {
		dispatch(getWarehouseProductsAction() as any)
	}, [])

	return (
		<div className='w-full'>
			<BasketDrawer open={basketIsOpen} setOpen={setbasket} />

			<div className='flex items-center justify-between gap-4 pb-4'>
				<Input
					placeholder='Filter product...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={event =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>

				<div className='flex items-center gap-4'>
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

					<ImportProductDrawer />
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
								Quantity
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Price
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Sell price
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
									<div className='flex gap-1 font-medium text-right'>
										<b>{item.quantity.toLocaleString()}</b>
										{item.unit.name}
									</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									<div className='flex font-medium text-right'>
										{item.price.toLocaleString()} sum
									</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									<div className='flex font-medium text-right'>
										{item.sellPrice.toLocaleString()} sum
									</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200  gap-2'>
									<div className='flex items-center justify-center gap-2'>
										<Link to={`/warehouse/${item.id}`}>
											<Button size={'icon'}>
												<EyeOpenIcon />
											</Button>
										</Link>
										<div className='h-8 w-[1px] bg-slate-200 mx-2' />
										{basket.find(x => x.id === item.id) ? (
											<Button
												size={'icon'}
												className='w-8 h-8 bg-green-500 hover:bg-green-600'
											>
												<BiCheckCircle />
											</Button>
										) : (
											<Button
												title='Add to basket'
												disabled={item.quantity === 0}
												onClick={() => {
													dispatch(
														addToBasket({
															add_quantity: 1,
															...item,
														})
													)
												}}
												size={'icon'}
												className='w-8 h-8 bg-amber-500 hover:bg-amber-600'
											>
												<BiCartAdd className='text-xl' />
											</Button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
