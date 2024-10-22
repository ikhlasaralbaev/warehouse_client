import { useAppSelector } from '@/hooks'
import { Button } from '@/components/ui/button'
import { EditIcon, Trash, EyeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const RolesTable = () => {
  const { roles } = useAppSelector(state => state.roles)


  return (
    <div>
      <table className="w-[80%] border border-gray-200">
        <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 ">
          <tr>
            <th className="py-[15px] px-[20px]">ID</th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Название
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Действия
            </th>
          </tr>
        </thead>

        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200">
                <div className="capitalize">{role.id}</div>
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                {role.name}
              </td>
              <td className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex items-center gap-2 font-medium text-right">
                  <Link to={`/role/${role.id}`}>
                  <Button size={"icon"} className='bg-green-500 hover:bg-green-600'>
                    <EyeIcon />
                    </Button>
                  </Link>
                  <div className='h-6 border-l border-gray-200 '></div>
                  <Button size={"icon"}>
                    <EditIcon />
                  </Button>
                  <div className='h-6 border-l border-gray-200 '></div>
                  <Button size={"icon"} className='bg-red-500 hover:bg-red-600'>
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

export default RolesTable
