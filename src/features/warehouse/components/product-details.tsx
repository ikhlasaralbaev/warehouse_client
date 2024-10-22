import { useAppSelector } from "@/hooks"
import ProductDetailHeader from "./product-detail-header"
import ProductDetailIncomes from "./product-detail-incomes"
import ProductDetailSells from "./product-detail-sells"

const ProductDetails = () => {
  const { productDetails } = useAppSelector((state) => state.warehouse)

  return (
    <div>
      <ProductDetailHeader />
      <ProductDetailIncomes />
      <ProductDetailSells />
    </div>
  )
}

export default ProductDetails
