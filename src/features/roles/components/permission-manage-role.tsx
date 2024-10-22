import React, { useEffect, FC } from 'react'
import { useAppSelector } from '@/hooks'
import { Switch } from '@/components/ui/switch'
import type { IPermission } from '../types'

interface Props {
  initialPermissions?: number[]
  changePermissions: (permissions: number[]) => void
}

const PermissionManageRole: FC<Props> = ({ initialPermissions, changePermissions }) => {
  const { permissions } = useAppSelector((state) => state.roles)
  const [selectedPermissions, setSelectedPermissions] = React.useState<
    number[]
  >([])
  const [groupedPermissions, setGroupedPermissions] = React.useState<any>({})

  useEffect(() => {
    if (initialPermissions) {
      setSelectedPermissions(initialPermissions)
    }
  }, [permissions])

  // set grouped permissions
  useEffect(() => {
    const grouped = permissions.reduce((acc: any, permission) => {
      if (!acc[permission.name]) {
        acc[permission.name] = []
      }

      acc[permission.name].push(permission)

      return acc
    }, {})

    setGroupedPermissions(grouped)
  }, [permissions])

  useEffect(() => {
    changePermissions(selectedPermissions)
  }, [selectedPermissions])

  const handlePermissionToggle = (
    id: number,
    action: string,
    bool: boolean
  ) => {
    const index = selectedPermissions.indexOf(id)
    const allActionsThisPermission = permissions.filter(
      (permission) =>
        permission.name ===
        permissions.find((permission) => permission.id === id)?.name
    )
     const actionAll = allActionsThisPermission.find(
          (permission) => permission.action === 'all'
        )

    if (bool) {
      if (index === -1) {
        if (action === 'all') {
          setSelectedPermissions([
            ...selectedPermissions,
            ...allActionsThisPermission.map((permission) => permission.id),
          ])
        } else {
          const isAllActionsSelected = allActionsThisPermission.filter((item) => item.action !== "all").filter(
            (permission) => selectedPermissions.includes(permission.id)
          )

          console.log(isAllActionsSelected)

          if (isAllActionsSelected.length === 3) {
            setSelectedPermissions([
              ...selectedPermissions,
              id!,
              actionAll?.id!
            ])
          } else {
            setSelectedPermissions([...selectedPermissions, id])
          }

        }
      } else {
        if (action === 'all') {
          setSelectedPermissions(
            selectedPermissions.filter(
              (permission) =>
                !allActionsThisPermission
                  .map((permission) => permission.id)
                  .includes(permission)
            )
          )
        } else {
          const isAllActionsSelected = allActionsThisPermission.filter((item) => item.action !== "all").filter(
            (permission) => selectedPermissions.includes(permission.id)
          )

          console.log(isAllActionsSelected)

          if (isAllActionsSelected.length === 3) {
            setSelectedPermissions([
              ...selectedPermissions,
              id!,
              actionAll?.id!
            ])
          } else {
            setSelectedPermissions([...selectedPermissions, id])
          }

        }
      }
    } else {
      if (action === 'all') {
        setSelectedPermissions(
          selectedPermissions.filter(
            (permission) =>
              !allActionsThisPermission
                .map((permission) => permission.id)
                .includes(permission)
          )
        )
      } else {
        setSelectedPermissions(
          selectedPermissions.filter((permission) => permission !== id && permission !== actionAll?.id)
        )
      }
    }
  }

  function compare(a: IPermission, b: IPermission) {
    if (a.action < b.action) {
      return -1
    }
    if (a.action > b.action) {
      return 1
    }
    return 0
  }

  return (
    <div>

      <table className="w-[100%] border border-gray-200">
        <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100">
          <tr>
            <th className="py-[15px] px-[20px] border-x  border-x-gray-200">
              Название
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Все действия
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Добавить
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Удалить
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Просмотр
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Изменить
            </th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(groupedPermissions).map((key: string) => (
            <tr key={key}>
              <td className="py-[15px] px-[20px] font-semibold border-b border-b-gray-200">
                {key}
              </td>
              {(groupedPermissions[key] as IPermission[])
                .sort(compare)
                .map((permission: any) => {
                  return (
                    permission.name === key && (
                      <td key={permission.id} className="px-[20px] py-[10px] text-sm border-b border-b-200 border-x border-x-200">
                        <div className="flex items-center gap-2 font-medium text-right">
                          <Switch
                            checked={selectedPermissions.includes(
                              permission.id
                            )}
                            onCheckedChange={(checked) =>
                              handlePermissionToggle(
                                permission.id,
                                permission.action,
                                checked
                              )
                            }
                          />
                        </div>
                      </td>
                    )
                  )
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PermissionManageRole
