import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Select from "react-select/async"
import { warehouseSchema } from "../lib/warehouse.validator"
import {
  createProductAction,
  getWarehouseProductsAction,
  getWarehouseUnitsAction,
} from "../store/warehouse.actions"
export function AddProductDrawer() {
  const { units } = useAppSelector((state) => state.warehouse)
  const dispatch = useAppDispatch()
  const [drawer, setDrawer] = useState(false)

  const formik: any = useFormik({
    initialValues: {
      name: "",
      price: "",
      unit: "",
      minCount: "",
    },
    validationSchema: warehouseSchema,
    onSubmit: (values: any) => {
      dispatch(createProductAction({ ...values, unit: +values.unit?.value! }) as any)
        .unwrap()
        .then((res) => {
          if (res.id) {
            dispatch(getWarehouseProductsAction() as any)
            toast.success("Product added succesfully!")
            setDrawer(false)
            formik.resetForm({
              name: "",
              price: "",
              unit: "",
            })
          }
        })
    },
  })

  useEffect(() => {
    dispatch(getWarehouseUnitsAction() as any)
  }, [])

  return (
    <>
      <Button onClick={() => setDrawer(true)}>Add product</Button>
      <Dialog open={drawer} onOpenChange={() => setDrawer(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <h2 className="text-lg font-semibold">Add Product</h2>
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={formik.handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>

              {/* Price Field */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full ${
                    formik.touched.price && formik.errors.price
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>

              {/* Price Field */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sell Price
                </label>
                <Input
                  id="sellPrice"
                  name="sellPrice"
                  type="number"
                  value={formik.values.sellPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full ${
                    formik.touched.sellPrice && formik.errors.sellPrice
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.sellPrice && formik.errors.sellPrice ? (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.sellPrice}
                  </div>
                ) : null}
              </div>

              {/* Price Field */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Min count
                </label>
                <Input
                  id="minCount"
                  name="minCount"
                  type="number"
                  value={formik.values.minCount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full ${
                    formik.touched.minCount && formik.errors.minCount
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.minCount && formik.errors.minCount ? (
                  <div className="mt-1 text-sm text-red-500">
                    {formik.errors.minCount}
                  </div>
                ) : null}
              </div>

              {/* Unit Select Field */}
              <div className="mb-4">
                <label
                  htmlFor="unit"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unit
                </label>
                <Select
                  isMulti={false}
                  onChange={(e: any) =>
                    formik.setValues({ ...formik.values, unit: e! })
                  }
                  defaultOptions={units.map((item) => ({
                    value: String(item.id),
                    label: item.name,
                  }))}
                  value={formik.values.unit}
                />

                {formik.touched.unit && formik.errors.unit ? (
                  <div className="mt-1 text-sm text-red-500">
                    {formik?.errors?.unit}
                  </div>
                ) : null}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
