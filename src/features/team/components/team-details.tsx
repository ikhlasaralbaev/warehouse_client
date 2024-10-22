import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getTeamDetailsAction } from "../store/team.actions"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Button } from "@/components/ui/button"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { BiEdit } from "react-icons/bi"
import moment from "moment"

const TeamDetails = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { teamDetails } = useAppSelector((state) => state.team)

  useEffect(() => {
    dispatch(getTeamDetailsAction({ id: +id! }))
  }, [dispatch, id])

  return (
    <div>
      <h1 className="mb-3 text-xl font-medium">
        Продажа - {teamDetails?.fullName}
      </h1>
      <div>
        <table className="w-full border border-gray-200">
          <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 ">
            <tr>
              <th className="py-[15px] px-[20px]">Дата</th>
              <th className="py-[15px] px-[20px] border-x border-x-gray-200">
                Сумма
              </th>
              <th className="py-[15px] px-[20px] border-x border-x-gray-200">
                Quantity
              </th>
              <th className="py-[15px] px-[20px] border-x border-x-gray-200">
                Created by
              </th>
              <th className="py-[15px] px-[20px]"></th>
            </tr>
          </thead>
          <tbody>
            {teamDetails?.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-[20px] py-[5px] text-sm border-b border-b-200">
                  {moment(transaction.createdAt).format("DD.MM.YYYY HH:mm")}
                </td>
                <td className="px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200">
                  {transaction.totalAmount.toLocaleString()} сум
                </td>
                <td className="px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200">
                  {transaction.transactionProducts.length}
                </td>
                <td className="px-[20px] py-[5px] text-sm border-b border-b-200 border-x border-x-200">
                  {transaction.createdBy.email}
                </td>
                <td className="px-[20px] py-[5px] text-sm border-b border-b-200  gap-2">
                  <div className="flex gap-2">
                    <Button size={"icon"}>
                      <EyeOpenIcon />
                    </Button>
                    <Button
                      size={"icon"}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <BiEdit />
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

export default TeamDetails
