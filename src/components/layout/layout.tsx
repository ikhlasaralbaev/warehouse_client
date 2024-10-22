import { BsAwardFill } from "react-icons/bs";
import { HiOfficeBuilding } from 'react-icons/hi'
import { MdOutlineSell } from 'react-icons/md'
;('use client')

import { LogoSvg } from '@/assets'
import { useAppSelector } from '@/hooks'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	TransitionChild,
} from '@headlessui/react'
import {
	ChevronDownIcon,
	MagnifyingGlassIcon,
	QueueListIcon,
} from '@heroicons/react/20/solid'
import {
	Bars3Icon,
	BellIcon,
	Cog6ToothIcon,
	HomeIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { BoxModelIcon, ListBulletIcon } from '@radix-ui/react-icons'
import { UsersIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BiBasket, BiListCheck } from 'react-icons/bi'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const navigation = [
	{ name: () => 'Dashboard', href: '/', icon: HomeIcon, current: true },
	{
		name: () => 'Номенклатура',
		href: '/products',
		icon: QueueListIcon,
		current: false,
	},
	{
		name: () => 'Склад',
		href: '/warehouse',
		icon: BoxModelIcon,
		current: false,
	},
	{
		name: () => 'Product incomes',
		href: '/incomes',
		icon: BiListCheck,
		current: false,
	},
	{
		name: () => 'Orders',
		href: '/orders',
		icon: MdOutlineSell,
		current: false,
	},
	{
		name: () => 'Employees',
		href: '/employees',
		icon: UsersIcon,
		current: false,
	},
	{
		name: () => 'Roles',
		href: '/roles',
		icon: BsAwardFill ,
		current: false,
	},
	{
		name: (count: number) => (
			<span>
				Корзина <b className='text-amber-500'>({count})</b>
			</span>
		),
		href: '/basket',
		icon: BiBasket,
		current: false,
	},
	{
		name: () => 'Team',
		href: '/team',
		icon: HiOfficeBuilding,
		current: false,
	},
	{ name: () => 'Units', href: '/units', icon: ListBulletIcon, current: false },
]

const userNavigation = [
	{ name: () => 'Your profile', href: '#' },
	{ name: () => 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ')
}

export default function AppLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { user, isAuthLoading } = useAppSelector(state => state.auth)
	const { basket } = useAppSelector(state => state.warehouse)

	const { pathname } = useLocation()

	const navigate = useNavigate()

	useEffect(() => {
		if (!user && !isAuthLoading) {
			navigate('/login', { replace: true })
		}
	}, [user, isAuthLoading])

	return (
		<>
			<div>
				<Dialog
					open={sidebarOpen}
					onClose={setSidebarOpen}
					className='relative z-50 lg:hidden'
				>
					<DialogBackdrop
						transition
						className='fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
					/>

					<div className='fixed inset-0 flex'>
						<DialogPanel
							transition
							className='relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full'
						>
							<TransitionChild>
								<div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0'>
									<button
										type='button'
										onClick={() => setSidebarOpen(false)}
										className='-m-2.5 p-2.5'
									>
										<span className='sr-only'>Close sidebar</span>
										<XMarkIcon
											aria-hidden='true'
											className='w-6 h-6 text-white'
										/>
									</button>
								</div>
							</TransitionChild>
							{/* Sidebar component, swap this element with another sidebar if you like */}
							<div className='flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5 ring-1 ring-white/10'>
								<div className='flex items-center h-16 shrink-0'>
									<img
										alt='Your Company'
										src={LogoSvg}
										className='w-auto h-8'
									/>
								</div>
								<nav className='flex flex-col flex-1'>
									<ul role='list' className='flex flex-col flex-1 gap-y-7'>
										<li>
											<ul role='list' className='-mx-2 space-y-1'>
												{navigation.map(item => (
													<li key={item.name(basket.length) as string}>
														<Link
															to={item.href}
															className={classNames(
																item.href === pathname
																	? 'bg-gray-800 text-white'
																	: 'text-gray-400 hover:bg-gray-800 hover:text-white',
																'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
															)}
														>
															<item.icon
																aria-hidden='true'
																className='w-6 h-6 shrink-0'
															/>
															{item.name(basket.length)}
														</Link>
													</li>
												))}
											</ul>
										</li>

										<li className='mt-auto'>
											<a
												href='#'
												className='flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white'
											>
												<Cog6ToothIcon
													aria-hidden='true'
													className='w-6 h-6 shrink-0'
												/>
												Settings
											</a>
										</li>
									</ul>
								</nav>
							</div>
						</DialogPanel>
					</div>
				</Dialog>

				{/* Static sidebar for desktop */}
				<div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className='flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5'>
						<div className='flex items-center h-16 shrink-0'>
							<img alt='Your Company' src={LogoSvg} className='w-auto h-8' />
						</div>
						<nav className='flex flex-col flex-1'>
							<ul role='list' className='flex flex-col flex-1 gap-y-7'>
								<li>
									<ul role='list' className='-mx-2 space-y-1'>
										{navigation.map(item => (
											<li key={item.name(basket.length) as string}>
												<Link
													to={item.href}
													className={classNames(
														item.href === pathname
															? 'bg-gray-800 text-white'
															: 'text-gray-400 hover:bg-gray-800 hover:text-white',
														'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
													)}
												>
													<item.icon
														aria-hidden='true'
														className='w-6 h-6 shrink-0'
													/>
													{item.name(basket.length)}
												</Link>
											</li>
										))}
									</ul>
								</li>

								<li className='mt-auto'>
									<a
										href='#'
										className='flex p-2 -mx-2 text-sm font-semibold leading-6 text-gray-400 rounded-md group gap-x-3 hover:bg-gray-800 hover:text-white'
									>
										<Cog6ToothIcon
											aria-hidden='true'
											className='w-6 h-6 shrink-0'
										/>
										Settings
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className='lg:pl-72'>
					<div className='sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8'>
						<button
							type='button'
							onClick={() => setSidebarOpen(true)}
							className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
						>
							<span className='sr-only'>Open sidebar</span>
							<Bars3Icon aria-hidden='true' className='w-6 h-6' />
						</button>

						{/* Separator */}
						<div
							aria-hidden='true'
							className='w-px h-6 bg-gray-900/10 lg:hidden'
						/>

						<div className='flex self-stretch flex-1 gap-x-4 lg:gap-x-6'>
							<form action='#' method='GET' className='relative flex flex-1'>
								<label htmlFor='search-field' className='sr-only'>
									Search
								</label>
								<MagnifyingGlassIcon
									aria-hidden='true'
									className='absolute inset-y-0 left-0 w-5 h-full text-gray-400 pointer-events-none'
								/>
								<input
									id='search-field'
									name='search'
									type='search'
									placeholder='Search...'
									className='block w-full h-full py-0 pl-8 pr-0 text-gray-900 border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
								/>
							</form>
							<div className='flex items-center gap-x-4 lg:gap-x-6'>
								<button
									type='button'
									className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
								>
									<span className='sr-only'>View notifications</span>
									<BellIcon aria-hidden='true' className='w-6 h-6' />
								</button>

								{/* Separator */}
								<div
									aria-hidden='true'
									className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
								/>

								{/* Profile dropdown */}
								<Menu as='div' className='relative'>
									<MenuButton className='-m-1.5 flex items-center p-1.5'>
										<span className='sr-only'>Open user menu</span>
										<img
											alt=''
											src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
											className='w-8 h-8 rounded-full bg-gray-50'
										/>
										<span className='hidden lg:flex lg:items-center'>
											<span
												aria-hidden='true'
												className='ml-4 text-sm font-semibold leading-6 text-gray-900'
											>
												{user?.email}
											</span>
											<ChevronDownIcon
												aria-hidden='true'
												className='w-5 h-5 ml-2 text-gray-400'
											/>
										</span>
									</MenuButton>
									<MenuItems
										transition
										className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
									>
										{userNavigation.map(item => (
											<MenuItem key={item.name()}>
												<a
													href={item.href}
													className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'
												>
													{item.name()}
												</a>
											</MenuItem>
										))}
									</MenuItems>
								</Menu>
							</div>
						</div>
					</div>

					<main className='py-10'>
						<div className='px-4 sm:px-6 lg:px-8'>
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</>
	)
}
