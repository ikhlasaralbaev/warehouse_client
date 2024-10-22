'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { confirmAlert } from 'react-confirm-alert'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import { deleteUnitAction } from '../store/units.actions'
import { CreateUnitForm } from './create-unit-form'

export function UnitsTable() {
	const dispatch = useAppDispatch()
	const { units } = useAppSelector(state => state.units)

	const handleDelete = (id: number) => {
		confirmAlert({
			title: 'Do you want delete this unit?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => {
						dispatch(deleteUnitAction(id)).then(res => {
							if (res.type === 'warehouse/delete-unit/fulfilled') {
								toast.success('Unit deleted successfully!')
							}
						})
					},
				},
				{
					label: 'No',
					onClick: () => {},
				},
			],
		})
	}

	return (
		<div className='w-full '>
			<div className='flex items-center justify-between gap-4 pb-4'>
				<Input placeholder='Filter product...' className='max-w-sm' />

				<div className='flex gap-4'>
					<CreateUnitForm />
				</div>
			</div>
			<div className=''>
				<table className=' rounded-md w-[70%] border border-gray-200'>
					<thead className='w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 '>
						<tr>
							<th className='py-[15px] px-[20px]'>ID</th>
							<th className='py-[15px] px-[20px] border-x border-x-gray-200'>
								unit
							</th>
							<th className='py-[15px] px-[20px]'></th>
						</tr>
					</thead>
					<tbody>
						{units.map(item => (
							<tr key={item.id}>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200'>
									<div className='capitalize'>{item.id}</div>
								</td>
								<td className='px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200'>
									{item.name}
								</td>

								<td className='px-[20px] py-[5px] text-sm border-b border-b-200  gap-2'>
									<div className='flex items-center justify-end gap-2'>
										<Button
											onClick={() => {
												handleDelete(item.id)
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
		</div>
	)
}
