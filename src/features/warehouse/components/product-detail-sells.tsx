import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import moment from "moment"

const ProductDetailSells = () => {
  const { productDetails } = useAppSelector((state) => state.warehouse)
  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-medium">Продажи</h1>

      <table className="w-full border border-gray-200">
        <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 ">
          <tr>
            <th className="py-[15px] px-[20px]">Дата</th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Количество
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Цена
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Команда
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Итого
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200"></th>
          </tr>
        </thead>

        <tbody>
          {productDetails?.transactionProducts.map((item) => (
            <tr>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200">
                <div className="capitalize">
                  {moment(item?.createdAt).format("DD:MM:YYYY HH:ss")}
                </div>
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                {item?.quantity}
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex font-medium text-right">
                  {Number(
                    item?.transaction.totalAmount / item.quantity
                  ).toFixed(2)}{" "}
                  sum
                </div>
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex font-medium text-right">
                  {item?.transaction.team.fullName}
                </div>
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex font-medium text-right">
                  {item?.transaction.totalAmount} sum
                </div>
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex justify-end font-medium text-right`">
                  <Button size={"icon"}>
                    <EyeOpenIcon />
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

export default ProductDetailSells
