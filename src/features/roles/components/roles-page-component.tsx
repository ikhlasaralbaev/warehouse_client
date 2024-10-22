import { useAppDispatch } from '@/hooks'
import { useEffect, useState } from 'react'
import { getAllPermissions, getRoles } from '../store/roles.actions'
import RolesTable from './roles-table'
import { Button } from '@/components/ui/button'
import CreateRoleDrawer from './create-role-drawer'

const RolesPageComponent = () => {
  const dispatch = useAppDispatch()
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    dispatch(getRoles() as any)
    dispatch(getAllPermissions() as any)
  }, [])

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='mb-4 text-2xl font-semibold'>Roles</h1>

        <Button onClick={
          () => setDrawer(true)
        } size={"sm"}>+ Create Role</Button>
      </div>
      <RolesTable />

      <CreateRoleDrawer
        open={drawer}
        setOpen={setDrawer}
      />
    </div>
  )
}

export default RolesPageComponent
