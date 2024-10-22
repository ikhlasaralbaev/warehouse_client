import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import moment from "moment"

const ProductDetailIncomes = () => {
  const { productDetails } = useAppSelector((state) => state.warehouse)
  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-medium">Приходы</h1>

      <table className="w-full border border-gray-200">
        <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 ">
          <tr>
            <th className="py-[15px] px-[20px]">Дата</th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Количество
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Total price
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200"></th>
          </tr>
        </thead>

        <tbody>
          {productDetails?.incomeTransactions.map((item) => (
            <tr>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200">
                <div className="capitalize">
                  {moment(item?.createdAt).format("DD:MM:YYYY HH:ss")}
                </div>
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                {item?.quantity.toLocaleString()}
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex font-medium text-right">
                  {item?.totalPrice.toLocaleString()} sum
                </div>
              </td>
              <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
                <div className="flex justify-end font-medium text-right">
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

export default ProductDetailIncomes
