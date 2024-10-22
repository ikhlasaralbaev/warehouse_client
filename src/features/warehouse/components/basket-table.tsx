import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { FC } from 'react'
import { BiTrash } from 'react-icons/bi'
import { TbBasketX } from 'react-icons/tb'
import {
	changeBasketItemQuantity,
	removeFromBasket,
} from '../store/warehouse.slice'
import { IBasketProductItem } from '../types'
import { BasketOrderModal } from './basket-order-modal'

type BasketTableProps = {
	withTitle?: boolean
}

const BasketTable: FC<BasketTableProps> = ({ withTitle = true }) => {
	const { basket } = useAppSelector(state => state.warehouse)
	const dispatch = useAppDispatch()

	function getTotalPrice(): number {
		return basket.reduce(
			(acc: number, item: IBasketProductItem) =>
				acc + item.price * item.add_quantity,
			0
		)
	}

	return (
		<div className='relative flex-1 w-full px-4 sm:px-6'>
			{basket.length === 0 ? (
				<div className='w-full p-[50px] bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-center flex-col'>
					<TbBasketX className='text-[100px] text-slate-300' />
					<h1 className='text-4xl text-slate-300'>Корзина пуста!</h1>
				</div>
			) : (
				<>
					{withTitle && <h1 className='mb-4 text-xl font-medium'>Basket</h1>}
					<div className='w-full overflow-x-auto border border-gray-200'>
						<table className='w-full overflow-x-auto '>
							<thead className='w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 '>
								<tr>
									<th className='py-[15px] px-[20px]'>Product</th>
									<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
										Price
									</th>
									<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
										Count
									</th>
									<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
										Add count
									</th>
									<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
										Total price
									</th>
									<th className='py-[15px] px-[20px] border-x border-x-gray-200'></th>
								</tr>
							</thead>

							<tbody>
								{basket.map(item => (
									<tr>
										<td className='px-[20px] py-[10px] text-sm border-b border-b-200'>
											<div className='capitalize'>{item?.name}</div>
										</td>
										<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
											{item?.price.toLocaleString()} sum
										</td>
										<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
											<div className='flex gap-1 font-medium text-right'>
												<b>{item?.quantity.toLocaleString()}</b>
												{item.unit.name}
											</div>
										</td>
										<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
											<Input
												className='h-full w-[100px]'
												value={item.add_quantity}
												max={item.quantity}
												type='number'
												onChange={e => {
													dispatch(
														changeBasketItemQuantity({
															id: item.id,
															quantity:
																+e.target.value > item.quantity
																	? item.quantity
																	: +e.target.value,
														})
													)
												}}
											/>
										</td>
										<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
											<Input
												className='h-full w-[100px]'
												value={(
													item.price * item.add_quantity
												).toLocaleString()}
												readOnly
											/>
										</td>
										<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
											<Button
												onClick={() => {
													dispatch(removeFromBasket({ id: item.id }))
												}}
												className='bg-red-500 hover:bg-red-600'
												size={'icon'}
											>
												<BiTrash />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className='flex justify-between mt-4'>
						<h1>
							<b>{basket.length}</b> items, total price:{' '}
							<b>{getTotalPrice().toLocaleString()}</b> sum
						</h1>
						<BasketOrderModal totalPrice={getTotalPrice()} />
					</div>
				</>
			)}
		</div>
	)
}

export default BasketTable
