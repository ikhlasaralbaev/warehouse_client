import { useAppDispatch } from '@/hooks'
import { useEffect, useState } from 'react'
import { getEmployees } from '../store/employees.actions'
import EmployeesTable from './employees-table'
import { Button } from '@/components/ui/button'
import CreateEmployeeForm from './create-employee-drawer'
const EmployeesPageComponent = () => {
  const dispatch = useAppDispatch()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    dispatch(getEmployees() as any)
  }, [dispatch])

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Employees</h1>

        <div className="flex justify-end">
          <Button onClick={
            () => setDrawerOpen(true)
          } size={"sm"}>Add employee</Button>
          </div>
      </div>
      <EmployeesTable />

      <CreateEmployeeForm open={drawerOpen} setOpen={() => setDrawerOpen(false)} />
    </div>
  )
}

export default EmployeesPageComponent
