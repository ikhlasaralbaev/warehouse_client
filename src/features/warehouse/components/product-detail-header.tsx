import { useAppDispatch, useAppSelector } from "@/hooks"
import React, { useEffect } from "react"
import { getProductDetails } from "../store/warehouse.actions"
import { useParams } from "react-router-dom"
import moment from "moment"

const ProductDetailHeader = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const { productDetails } = useAppSelector((state) => state.warehouse)

  useEffect(() => {
    dispatch(getProductDetails({ product_id: id! }) as any)
  }, [id, dispatch])

  return (
    <div>
      <table className="w-[80%] border border-gray-200">
        <thead className="w-full text-xs font-semibold tracking-wider text-left text-gray-500 uppercase bg-gray-100 ">
          <tr>
            <th className="py-[15px] px-[20px]">ID</th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Продукция
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Количество
            </th>
            <th className="py-[15px] px-[20px] border-x border-x-gray-200">
              Дата
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="px-[20px] py-[15px] text-sm border-b border-b-200">
              <div className="capitalize">{productDetails?.id}</div>
            </td>
            <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
              {productDetails?.name}
            </td>
            <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
              <div className="flex font-medium text-right">
                {productDetails?.quantity} {productDetails?.unit.name}.
              </div>
            </td>
            <td className="px-[20px] py-[15px] text-sm border-b border-b-200 border-x border-x-200">
              <div className="flex font-medium text-right">
                {moment(productDetails?.createdAt).format("DD.MM.YYYY HH:mm")}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProductDetailHeader
