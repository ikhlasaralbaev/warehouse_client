/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import StatisticCards from '@/pages/dashboard/components/statistic-cards'
import {
	Label,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react'
import {
	CalendarDaysIcon,
	CreditCardIcon,
	FaceFrownIcon,
	FaceSmileIcon,
	FireIcon,
	HandThumbUpIcon,
	HeartIcon,
	PaperClipIcon,
	UserCircleIcon,
	XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

const navigation = [
	{ name: 'Home', href: '#' },
	{ name: 'Invoices', href: '#' },
	{ name: 'Clients', href: '#' },
	{ name: 'Expenses', href: '#' },
]
const invoice = {
	subTotal: '$8,800.00',
	tax: '$1,760.00',
	total: '$10,560.00',
	items: [
		{
			id: 1,
			title: 'Logo redesign',
			description: 'New logo and digital asset playbook.',
			hours: '20.0',
			rate: '$100.00',
			price: '$2,000.00',
		},
		{
			id: 2,
			title: 'Website redesign',
			description: 'Design and program new company website.',
			hours: '52.0',
			rate: '$100.00',
			price: '$5,200.00',
		},
		{
			id: 3,
			title: 'Business cards',
			description: 'Design and production of 3.5" x 2.0" business cards.',
			hours: '12.0',
			rate: '$100.00',
			price: '$1,200.00',
		},
		{
			id: 4,
			title: 'T-shirt design',
			description: 'Three t-shirt design concepts.',
			hours: '4.0',
			rate: '$100.00',
			price: '$400.00',
		},
	],
}
const activity = [
	{
		id: 1,
		type: 'created',
		person: { name: 'Chelsea Hagon' },
		date: '7d ago',
		dateTime: '2023-01-23T10:32',
	},
	{
		id: 2,
		type: 'edited',
		person: { name: 'Chelsea Hagon' },
		date: '6d ago',
		dateTime: '2023-01-23T11:03',
	},
	{
		id: 3,
		type: 'sent',
		person: { name: 'Chelsea Hagon' },
		date: '6d ago',
		dateTime: '2023-01-23T11:24',
	},
	{
		id: 4,
		type: 'commented',
		person: {
			name: 'Chelsea Hagon',
			imageUrl:
				'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
		comment:
			'Called client, they reassured me the invoice would be paid by the 25th.',
		date: '3d ago',
		dateTime: '2023-01-23T15:56',
	},
	{
		id: 5,
		type: 'viewed',
		person: { name: 'Alex Curren' },
		date: '2d ago',
		dateTime: '2023-01-24T09:12',
	},
	{
		id: 6,
		type: 'paid',
		person: { name: 'Alex Curren' },
		date: '1d ago',
		dateTime: '2023-01-24T09:20',
	},
]
const moods = [
	{
		name: 'Excited',
		value: 'excited',
		icon: FireIcon,
		iconColor: 'text-white',
		bgColor: 'bg-red-500',
	},
	{
		name: 'Loved',
		value: 'loved',
		icon: HeartIcon,
		iconColor: 'text-white',
		bgColor: 'bg-pink-400',
	},
	{
		name: 'Happy',
		value: 'happy',
		icon: FaceSmileIcon,
		iconColor: 'text-white',
		bgColor: 'bg-green-400',
	},
	{
		name: 'Sad',
		value: 'sad',
		icon: FaceFrownIcon,
		iconColor: 'text-white',
		bgColor: 'bg-yellow-400',
	},
	{
		name: 'Thumbsy',
		value: 'thumbsy',
		icon: HandThumbUpIcon,
		iconColor: 'text-white',
		bgColor: 'bg-blue-500',
	},
	{
		name: 'I feel nothing',
		value: null,
		icon: XMarkIconMini,
		iconColor: 'text-gray-400',
		bgColor: 'bg-transparent',
	},
]

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

export default function HomePageComponent() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [selected, setSelected] = useState(moods[5])

	return (
		<>
			<main>
				<header className='relative pt-2 isolate'>
					<div
						aria-hidden='true'
						className='absolute inset-0 overflow-hidden -z-10'
					>
						<div className='absolute -mt-16 opacity-50 left-16 top-full transform-gpu blur-3xl xl:left-1/2 xl:-ml-80'>
							<div
								style={{
									clipPath:
										'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
								}}
								className='aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]'
							/>
						</div>
						<div className='absolute inset-x-0 bottom-0 bg-gray-900/5' />
					</div>

					<div className='px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8'>
						<StatisticCards />
					</div>
				</header>

				<div className='px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8'>
					<div className='grid items-start max-w-2xl grid-cols-1 grid-rows-1 mx-auto gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
						{/* Invoice summary */}
						<div className='lg:col-start-3 lg:row-end-1'>
							<h2 className='sr-only'>Summary</h2>
							<div className='rounded-lg shadow-sm bg-gray-50 ring-1 ring-gray-900/5'>
								<dl className='flex flex-wrap'>
									<div className='flex-auto pt-6 pl-6'>
										<dt className='text-sm font-semibold leading-6 text-gray-900'>
											Amount
										</dt>
										<dd className='mt-1 text-base font-semibold leading-6 text-gray-900'>
											$10,560.00
										</dd>
									</div>
									<div className='self-end flex-none px-6 pt-4'>
										<dt className='sr-only'>Status</dt>
										<dd className='px-2 py-1 text-xs font-medium text-green-600 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20'>
											Paid
										</dd>
									</div>
									<div className='flex flex-none w-full px-6 pt-6 mt-6 border-t gap-x-4 border-gray-900/5'>
										<dt className='flex-none'>
											<span className='sr-only'>Client</span>
											<UserCircleIcon
												aria-hidden='true'
												className='w-5 h-6 text-gray-400'
											/>
										</dt>
										<dd className='text-sm font-medium leading-6 text-gray-900'>
											Alex Curren
										</dd>
									</div>
									<div className='flex flex-none w-full px-6 mt-4 gap-x-4'>
										<dt className='flex-none'>
											<span className='sr-only'>Due date</span>
											<CalendarDaysIcon
												aria-hidden='true'
												className='w-5 h-6 text-gray-400'
											/>
										</dt>
										<dd className='text-sm leading-6 text-gray-500'>
											<time dateTime='2023-01-31'>January 31, 2023</time>
										</dd>
									</div>
									<div className='flex flex-none w-full px-6 mt-4 gap-x-4'>
										<dt className='flex-none'>
											<span className='sr-only'>Status</span>
											<CreditCardIcon
												aria-hidden='true'
												className='w-5 h-6 text-gray-400'
											/>
										</dt>
										<dd className='text-sm leading-6 text-gray-500'>
											Paid with MasterCard
										</dd>
									</div>
								</dl>
								<div className='px-6 py-6 mt-6 border-t border-gray-900/5'>
									<a
										href='#'
										className='text-sm font-semibold leading-6 text-gray-900'
									>
										Download receipt <span aria-hidden='true'>&rarr;</span>
									</a>
								</div>
							</div>
						</div>

						{/* Invoice */}
						<div className='px-4 py-8 -mx-4 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16'>
							<h2 className='text-base font-semibold leading-6 text-gray-900'>
								Invoice
							</h2>
							<dl className='grid grid-cols-1 mt-6 text-sm leading-6 sm:grid-cols-2'>
								<div className='sm:pr-4'>
									<dt className='inline text-gray-500'>Issued on</dt>{' '}
									<dd className='inline text-gray-700'>
										<time dateTime='2023-23-01'>January 23, 2023</time>
									</dd>
								</div>
								<div className='mt-2 sm:mt-0 sm:pl-4'>
									<dt className='inline text-gray-500'>Due on</dt>{' '}
									<dd className='inline text-gray-700'>
										<time dateTime='2023-31-01'>January 31, 2023</time>
									</dd>
								</div>
								<div className='pt-6 mt-6 border-t border-gray-900/5 sm:pr-4'>
									<dt className='font-semibold text-gray-900'>From</dt>
									<dd className='mt-2 text-gray-500'>
										<span className='font-medium text-gray-900'>
											Acme, Inc.
										</span>
										<br />
										7363 Cynthia Pass
										<br />
										Toronto, ON N3Y 4H8
									</dd>
								</div>
								<div className='mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6'>
									<dt className='font-semibold text-gray-900'>To</dt>
									<dd className='mt-2 text-gray-500'>
										<span className='font-medium text-gray-900'>
											Tuple, Inc
										</span>
										<br />
										886 Walter Street
										<br />
										New York, NY 12345
									</dd>
								</div>
							</dl>
							<table className='w-full mt-16 text-sm leading-6 text-left whitespace-nowrap'>
								<colgroup>
									<col className='w-full' />
									<col />
									<col />
									<col />
								</colgroup>
								<thead className='text-gray-900 border-b border-gray-200'>
									<tr>
										<th scope='col' className='px-0 py-3 font-semibold'>
											Projects
										</th>
										<th
											scope='col'
											className='hidden py-3 pl-8 pr-0 font-semibold text-right sm:table-cell'
										>
											Hours
										</th>
										<th
											scope='col'
											className='hidden py-3 pl-8 pr-0 font-semibold text-right sm:table-cell'
										>
											Rate
										</th>
										<th
											scope='col'
											className='py-3 pl-8 pr-0 font-semibold text-right'
										>
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									{invoice.items.map(item => (
										<tr key={item.id} className='border-b border-gray-100'>
											<td className='px-0 py-5 align-top max-w-0'>
												<div className='font-medium text-gray-900 truncate'>
													{item.title}
												</div>
												<div className='text-gray-500 truncate'>
													{item.description}
												</div>
											</td>
											<td className='hidden py-5 pl-8 pr-0 text-right text-gray-700 align-top tabular-nums sm:table-cell'>
												{item.hours}
											</td>
											<td className='hidden py-5 pl-8 pr-0 text-right text-gray-700 align-top tabular-nums sm:table-cell'>
												{item.rate}
											</td>
											<td className='py-5 pl-8 pr-0 text-right text-gray-700 align-top tabular-nums'>
												{item.price}
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<th
											scope='row'
											className='px-0 pt-6 pb-0 font-normal text-gray-700 sm:hidden'
										>
											Subtotal
										</th>
										<th
											scope='row'
											colSpan={3}
											className='hidden px-0 pt-6 pb-0 font-normal text-right text-gray-700 sm:table-cell'
										>
											Subtotal
										</th>
										<td className='pt-6 pb-0 pl-8 pr-0 text-right text-gray-900 tabular-nums'>
											{invoice.subTotal}
										</td>
									</tr>
									<tr>
										<th
											scope='row'
											className='pt-4 font-normal text-gray-700 sm:hidden'
										>
											Tax
										</th>
										<th
											scope='row'
											colSpan={3}
											className='hidden pt-4 font-normal text-right text-gray-700 sm:table-cell'
										>
											Tax
										</th>
										<td className='pt-4 pb-0 pl-8 pr-0 text-right text-gray-900 tabular-nums'>
											{invoice.tax}
										</td>
									</tr>
									<tr>
										<th
											scope='row'
											className='pt-4 font-semibold text-gray-900 sm:hidden'
										>
											Total
										</th>
										<th
											scope='row'
											colSpan={3}
											className='hidden pt-4 font-semibold text-right text-gray-900 sm:table-cell'
										>
											Total
										</th>
										<td className='pt-4 pb-0 pl-8 pr-0 font-semibold text-right text-gray-900 tabular-nums'>
											{invoice.total}
										</td>
									</tr>
								</tfoot>
							</table>
						</div>

						<div className='lg:col-start-3'>
							{/* Activity feed */}
							<h2 className='text-sm font-semibold leading-6 text-gray-900'>
								Activity
							</h2>
							<ul role='list' className='mt-6 space-y-6'>
								{activity.map((activityItem, activityItemIdx) => (
									<li key={activityItem.id} className='relative flex gap-x-4'>
										<div
											className={classNames(
												activityItemIdx === activity.length - 1
													? 'h-6'
													: '-bottom-6',
												'absolute left-0 top-0 flex w-6 justify-center'
											)}
										>
											<div className='w-px bg-gray-200' />
										</div>
										{activityItem.type === 'commented' ? (
											<>
												<img
													alt=''
													src={activityItem.person.imageUrl}
													className='relative flex-none w-6 h-6 mt-3 rounded-full bg-gray-50'
												/>
												<div className='flex-auto p-3 rounded-md ring-1 ring-inset ring-gray-200'>
													<div className='flex justify-between gap-x-4'>
														<div className='py-0.5 text-xs leading-5 text-gray-500'>
															<span className='font-medium text-gray-900'>
																{activityItem.person.name}
															</span>{' '}
															commented
														</div>
														<time
															dateTime={activityItem.dateTime}
															className='flex-none py-0.5 text-xs leading-5 text-gray-500'
														>
															{activityItem.date}
														</time>
													</div>
													<p className='text-sm leading-6 text-gray-500'>
														{activityItem.comment}
													</p>
												</div>
											</>
										) : (
											<>
												<div className='relative flex items-center justify-center flex-none w-6 h-6 bg-white'>
													{activityItem.type === 'paid' ? (
														<CheckCircleIcon
															aria-hidden='true'
															className='w-6 h-6 text-indigo-600'
														/>
													) : (
														<div className='h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300' />
													)}
												</div>
												<p className='flex-auto py-0.5 text-xs leading-5 text-gray-500'>
													<span className='font-medium text-gray-900'>
														{activityItem.person.name}
													</span>{' '}
													{activityItem.type} the invoice.
												</p>
												<time
													dateTime={activityItem.dateTime}
													className='flex-none py-0.5 text-xs leading-5 text-gray-500'
												>
													{activityItem.date}
												</time>
											</>
										)}
									</li>
								))}
							</ul>

							{/* New comment form */}
							<div className='flex mt-6 gap-x-3'>
								<img
									alt=''
									src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
									className='flex-none w-6 h-6 rounded-full bg-gray-50'
								/>
								<form action='#' className='relative flex-auto'>
									<div className='pb-12 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600'>
										<label htmlFor='comment' className='sr-only'>
											Add your comment
										</label>
										<textarea
											id='comment'
											name='comment'
											rows={2}
											placeholder='Add your comment...'
											className='block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
											defaultValue={''}
										/>
									</div>

									<div className='absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
										<div className='flex items-center space-x-5'>
											<div className='flex items-center'>
												<button
													type='button'
													className='-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'
												>
													<PaperClipIcon
														aria-hidden='true'
														className='w-5 h-5'
													/>
													<span className='sr-only'>Attach a file</span>
												</button>
											</div>
											<div className='flex items-center'>
												<Listbox value={selected} onChange={setSelected}>
													<Label className='sr-only'>Your mood</Label>
													<div className='relative'>
														<ListboxButton className='relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
															<span className='flex items-center justify-center'>
																{selected.value === null ? (
																	<span>
																		<FaceSmileIcon
																			aria-hidden='true'
																			className='flex-shrink-0 w-5 h-5'
																		/>
																		<span className='sr-only'>
																			Add your mood
																		</span>
																	</span>
																) : (
																	<span>
																		<span
																			className={classNames(
																				selected.bgColor,
																				'flex h-8 w-8 items-center justify-center rounded-full'
																			)}
																		>
																			<selected.icon
																				aria-hidden='true'
																				className='flex-shrink-0 w-5 h-5 text-white'
																			/>
																		</span>
																		<span className='sr-only'>
																			{selected.name}
																		</span>
																	</span>
																)}
															</span>
														</ListboxButton>

														<ListboxOptions
															transition
															className='absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:ml-auto sm:w-64 sm:text-sm'
														>
															{moods.map(mood => (
																<ListboxOption
																	key={mood.value}
																	value={mood}
																	className='relative cursor-default select-none bg-white px-3 py-2 data-[focus]:bg-gray-100'
																>
																	<div className='flex items-center'>
																		<div
																			className={classNames(
																				mood.bgColor,
																				'flex h-8 w-8 items-center justify-center rounded-full'
																			)}
																		>
																			<mood.icon
																				aria-hidden='true'
																				className={classNames(
																					mood.iconColor,
																					'h-5 w-5 flex-shrink-0'
																				)}
																			/>
																		</div>
																		<span className='block ml-3 font-medium truncate'>
																			{mood.name}
																		</span>
																	</div>
																</ListboxOption>
															))}
														</ListboxOptions>
													</div>
												</Listbox>
											</div>
										</div>
										<button
											type='submit'
											className='rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
										>
											Comment
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
