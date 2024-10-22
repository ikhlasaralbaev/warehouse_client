'use client'

import { ChevronDownIcon, EyeOpenIcon } from '@radix-ui/react-icons'
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
import { useAppDispatch, useAppSelector } from '@/hooks'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useTeamTableData } from '../hooks/team.hooks'
import { deleteTeamAction, getTeamsAction } from '../store/team.actions'
import { setTeamPage } from '../store/team.slice'
import CreateTeamForm from './create-team-form'
import { Link } from 'react-router-dom'
import { EditIcon, EyeIcon, Trash } from 'lucide-react'
import { confirmAlert } from 'react-confirm-alert'
import toast from 'react-hot-toast'
import type { ITeam } from '../types'

export function TeamTable() {
	const table = useTeamTableData()
	const dispatch = useAppDispatch()
	const [open, setOpen] = useState(false)
	const { currentPage, totalPages, teams } = useAppSelector(state => state.team)


	const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null)

	const deleteTeam = (id: number) => {
		confirmAlert({
			title: 'Do you want delete this team?',
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

	useEffect(() => {
		dispatch(getTeamsAction({ page: currentPage }) as any)
	}, [])

	return (
		<div className='w-full'>
			<Dialog open={open} onClose={setOpen} className={'z-50 relative'}>
				<div className='fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm' />
				<div className='fixed inset-0 z-50 w-full overflow-hidden'>
					<div className='absolute inset-0 overflow-hidden'>
						<div className='fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none'>
							<DialogPanel
								transition
								className='pointer-events-auto  w-[320px] transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 '
							>
								<div className='flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl'>
									<div className='px-4 sm:px-6'>
										<div className='flex items-start justify-between'>
											<DialogTitle className='text-base font-semibold leading-6 text-gray-900'>
												Создать команду
											</DialogTitle>
										</div>
									</div>
									<CreateTeamForm
										setOpen={bool => {
											setOpen(bool)
										}}
									/>
								</div>
							</DialogPanel>
						</div>
					</div>
				</div>
			</Dialog>

			<div className='flex items-center justify-between gap-4 pb-4'>
				<Input
					placeholder='Filter product...'
					value={
						(table.getColumn('fullname')?.getFilterValue() as string) ?? ''
					}
					onChange={event =>
						table.getColumn('fullname')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>

				<div className='flex gap-4'>
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
					<Button
						onClick={() => {
							setOpen(true)
						}}
						size={'sm'}
					>
						+ Add team
					</Button>
				</div>
			</div>
			<div className='border rounded-md'>
				<div>
      <table className="w-[100%] border border-gray-200 border-b-transparent">
        <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 ">
          <tr>
            <th className="py-[15px] px-[20px]">ID</th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Название
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Phone
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Действия
            </th>
          </tr>
        </thead>

        <tbody>
          {teams.map(team => (
            <tr key={team.id}>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200">
                <div className="capitalize">{team.id}</div>
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                {team.fullName}
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                {team.phone}
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex items-center gap-2 font-medium text-right">
                  <Link to={`/team/${team.id}`}>
										<Button className='bg-blue-500 hover:bg-blue-600' size={'icon'}>
											<EyeOpenIcon />
										</Button>
									</Link>
                  <div className='h-6 border-l border-gray-200 '></div>
                  <Button size={"icon"}>
                    <EditIcon />
                  </Button>
                  <div className='h-6 border-l border-gray-200 '></div>
									<Button
										onClick={() => {
											deleteTeam(team.id)
										}}
										size={"icon"} className='bg-red-500 hover:bg-red-600'>
                    <Trash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

				<TablePagination
					current={currentPage}
					totalCount={totalPages}
					setCurrent={(page: number) => {
						dispatch(setTeamPage(page))
					}}
				/>
			</div>
		</div>
	)
}
