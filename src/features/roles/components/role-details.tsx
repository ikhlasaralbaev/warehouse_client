import { useAppDispatch } from '@/hooks'
import { getRoleDetails } from '../store/roles.actions'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { Button } from '@/components/ui/button'
import { EyeIcon, Trash } from 'lucide-react'
import { confirmAlert } from 'react-confirm-alert'
import { deleteEmployee } from '@/features/employees/store/employees.actions'
import toast from 'react-hot-toast'

const RoleDetailsPageComponent = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { roleDetails } = useSelector((state: RootState) => state.roles)


  useEffect(() => {
    dispatch(getRoleDetails(+id!) as any)
  }, [id])


  const handleDelete = (id: number) => {
    confirmAlert({
      title: 'Удалить сотрудника',
      message: 'Вы уверены, что хотите удалить этого сотрудника?',
      buttons: [
        {
          label: 'Да',
          onClick: () => {
            dispatch(deleteEmployee(id) as any)
              .unwrap()
              .then((res: any) => {
                if (res.affected === 1) {
                  toast.success('Сотрудник удален успешно!')
                }
              })
          },
        },
        {
          label: 'Нет',
          onClick: () => {},
        },
      ],
    })
  }

  return (
    <div>
      <h1 className='mb-4 text-xl font-semibold'>{ roleDetails?.name } - employees</h1>

      <table className="w-[100%] border border-gray-200">
        <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 ">
          <tr>
            <th className="py-[15px] px-[20px]">ID</th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Название
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Роль
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Действия
            </th>
          </tr>
        </thead>

        <tbody>
          {roleDetails?.users.map(employee => (
            <tr key={employee.id}>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200">
                <div className="capitalize">{employee.id}</div>
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                {employee.email}
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                {employee.roles.map((role, index) => <Link className='hover:text-blue-500' to={`/role/${role.id}`}>{ role.name}{index !== employee.roles.length - 1 ? ", " : ""} </Link>)}
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex items-center gap-2 font-medium text-right">
                  <Link to={`/role/${employee.id}`}>
                  <Button size={"icon"} className='bg-green-500 hover:bg-green-600'>
                    <EyeIcon />
                    </Button>
                  </Link>
                  <div className='h-6 border-l border-gray-200 '></div>
                  {/* <Button
                    onClick={() => setSelectedEmployee(employee)}
                    size={"icon"}>
                    <EditIcon />
                  </Button> */}
                  <Button onClick={
                    () => handleDelete(employee.id)
                  } size={"icon"} className='bg-red-500 hover:bg-red-600'>
                    <Trash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default RoleDetailsPageComponent
