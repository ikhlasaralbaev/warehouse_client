'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { TbBasketX } from 'react-icons/tb'

import { IOrder } from '../types'

export default function OrderProductsDrawer({
	open,
	setOpen,
	order,
}: {
	open: boolean
	setOpen: (open: boolean) => void
	order: IOrder
}) {
	return (
		<Dialog open={open} onClose={setOpen} className={'z-50 relative'}>
			<div className='fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm' />

			<div className='fixed inset-0 z-50 w-full overflow-hidden'>
				<div className='absolute inset-0 overflow-hidden'>
					<div className='fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none'>
						<DialogPanel
							transition
							className='pointer-events-auto w-screen max-w-4xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 '
						>
							<div className='flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl'>
								<div className='px-4 sm:px-6'>
									<div className='flex items-start justify-between'>
										<DialogTitle className='text-base font-semibold leading-6 text-gray-900'>
											Order products
										</DialogTitle>
										<div className='flex items-center ml-3 h-7'>
											<button
												type='button'
												onClick={() => setOpen(false)}
												className='relative text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
											>
												<span className='absolute -inset-2.5' />
												<span className='sr-only'>Close panel</span>
												<XMarkIcon aria-hidden='true' className='w-6 h-6' />
											</button>
										</div>
									</div>
								</div>

								<div className='relative flex-1 px-4 mt-6 sm:px-6'>
									{order?.transactionProducts?.length === 0 ? (
										<div className='w-full p-[50px] bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-center flex-col'>
											<TbBasketX className='text-[100px] text-slate-300' />
											<h1 className='text-4xl text-slate-300'>
												Basket is empty!
											</h1>
										</div>
									) : (
										<>
											<table className='w-full border border-gray-200'>
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
															Total price
														</th>
													</tr>
												</thead>

												<tbody>
													{order?.transactionProducts?.map(item => (
														<tr>
															<td className='px-[20px] py-[10px] text-sm border-b border-b-200'>
																<div className='capitalize'>
																	{item?.product?.name}
																</div>
															</td>
															<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
																{item?.product?.price.toLocaleString()} sum
															</td>
															<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
																<div className='flex gap-1 font-medium text-right'>
																	<b>{item?.quantity.toLocaleString()}</b>
																	{item.product?.unit.name}
																</div>
															</td>
															<td className='px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200'>
																<div className='flex gap-1 font-medium text-right'>
																	<b>
																		{(
																			item?.product?.price * item?.quantity
																		).toLocaleString()}
																	</b>
																	sum
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
											<div className='flex justify-end mt-4'></div>
										</>
									)}
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
