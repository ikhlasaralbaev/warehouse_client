import { Button } from '@/components/ui/button'
import { TablePagination } from '@/components/ui/custom-pagination'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { EyeIcon } from '@heroicons/react/20/solid'
import moment from 'moment'
import { useState } from 'react'
import { setOrderPage } from '../store/orders.slice'
import { IOrder } from '../types'
import OrderProductsDrawer from './order-products-drawer'

const OrdersTable = () => {
	const { orders, currentPage, totalPages } = useAppSelector(
		state => state.orders
	)
	const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)
	const dispatch = useAppDispatch()

	return (
		<div className='w-full'>
			<div className='flex items-center justify-between gap-4 pb-4'>
				<Input placeholder='Filter product...' className='max-w-sm' />

				<div className='flex items-center gap-4'></div>
			</div>
			<div className='overflow-x-auto border rounded-md'>
				<table className='w-full border border-gray-200'>
					<thead className='w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 '>
						<tr>
							<th className='py-[15px] px-[20px]'>ID</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Team
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Creator
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Date
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Amount
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Products
							</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								Description
							</th>
							<th className='py-[15px] px-[20px]'></th>
						</tr>
					</thead>
					<tbody>
						{orders.map(item => (
							<tr key={item.id}>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200'>
									<div className='capitalize'>{item.id}</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{item.team?.fullName || '--'}
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200 '>
									{item.createdBy?.email} <br />
									<span className='text-xs'>{item.createdBy?.role}</span>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{moment(item?.createdAt).format('DD.MM.YYYY HH:mm')}
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{item.totalAmount.toLocaleString()} sum
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{item.transactionProducts.length} шт.
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{item.description}
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									<Button onClick={() => setSelectedOrder(item)} size={'icon'}>
										<EyeIcon />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<TablePagination
					totalCount={totalPages}
					current={currentPage}
					setCurrent={(page: number) => {
						dispatch(setOrderPage(page))
					}}
				/>

				<OrderProductsDrawer
					order={selectedOrder!}
					setOpen={() => setSelectedOrder(null)}
					open={!!selectedOrder}
				/>
			</div>
		</div>
	)
}

export default OrdersTable
