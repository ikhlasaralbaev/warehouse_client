'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import PermissionManageRole from './permission-manage-role'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useAppDispatch } from '@/hooks'
import { createRole } from '../store/roles.actions'
import type { IRole } from '../types'
import toast from 'react-hot-toast'


export default function CreateRoleDrawer({
	open,
	setOpen,
}: {
	open: boolean
	setOpen: (open: boolean) => void
  }) {
  const [name, setName] = useState('')
  const [permissions, setPermissions] = useState<number[]>([])

  const dispatch = useAppDispatch()

  function handleNameChange(e: any) {
    setName(e.target.value)
  }

  function handleSubmit() {
    if (!name || !permissions.length) {
      return
    }
    dispatch(createRole({
      name,
      permissions
    }) as any)
      .unwrap()
      .then((res: IRole) => {
        if (res.id) {
          setOpen(false)
          setName('')
          setPermissions([])
          toast.success('Role created successfully!')
        }
      })
  }

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
											Create role.
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
								<div className='my-4 border-t' />
                <div className='grid gap-1 px-4'>
                  <span className='text-sm font-semibold'>Role name *</span>
                  <Input
                      onChange={handleNameChange}
                      className='mb-4'
                  />
                  <span className='text-sm font-semibold'>Permissions *</span>
                  <PermissionManageRole changePermissions={
                    (permissions: number[]) => setPermissions(permissions)
                  } initialPermissions={
                    permissions
                  } />

                  <div className='flex justify-end mt-4'>
                    <Button onClick={handleSubmit}>Submit</Button>
                  </div>
                </div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	)
}