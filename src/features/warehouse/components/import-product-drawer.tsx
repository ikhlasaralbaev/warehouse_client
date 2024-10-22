import { Button } from "@/components/ui/button"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import Select from "react-select/async"
import { importProductSchema } from "../lib/warehouse.validator"
import {
  getWarehouseUnitsAction,
  incomeProduct,
} from "../store/warehouse.actions"
import toast from "react-hot-toast"

export function ImportProductDrawer() {
  const { units, products } = useAppSelector((state) => state.warehouse)
  const dispatch = useAppDispatch()
  const [drawer, setDrawer] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)

  const formik: any = useFormik({
    initialValues: {
      product: {},
      quantity: 1,
    },
    validationSchema: importProductSchema,
    onSubmit: (values: any) => {
      dispatch(
        incomeProduct({
          product: +values.product.value,
          quantity: values.quantity,
          totalPrice: getTotalAmount(),
        }) as any
      )
        .unwrap()
        .then((res : any) => {
          if (res.product) {
            setDrawer(false)
            formik.resetForm()
            toast.success("Transaction completed successfully!")
          }
        })
    },
  })

  useEffect(() => {
    dispatch(getWarehouseUnitsAction() as any)
  }, [])

  function getTotalAmount() {
    return selectedProduct?.price * (quantity || 0) || 0
  }

  return (
    <>
      <Dialog open={drawer} onClose={setDrawer} className={"z-50 relative"}>
        <div className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm" />

        <div className="fixed inset-0 z-50 w-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <DialogPanel
                transition
                className="pointer-events-auto w-[420px] transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 "
              >
                <>
                  <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                          Import Product
                        </DialogTitle>
                      </div>
                      <div className="grid gap-4 py-4">
                        <form onSubmit={formik.handleSubmit}>
                          {/* Name Field */}
                          <div className="mb-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Product
                            </label>
                            <Select
                              isMulti={false}
                              onChange={(e: any) => {
                                formik.setValues({
                                  ...formik.values,
                                  product: e!,
                                })
                                console.log(e)
                                setSelectedProduct(
                                  products.find((item) => item.id == e.value)
                                )
                              }}
                              defaultOptions={
                                products.map((item) => ({
                                  value: String(item.id),
                                  label: item.name,
                                })) ?? []
                              }
                              value={formik.values.product}
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
                              Quantity
                            </label>
                            <div className='grid items-end grid-cols-7 gap-2'>
                            <Input
                              id="quantity"
                              name="quantity"
                              type="number"
                              value={formik.values.quantity}
                              onChange={(e) => {
                                formik.handleChange(e)
                                setQuantity(Number(e.target.value))
                              }}
                              onBlur={formik.handleBlur}
                              className={`mt-1 block col-span-5 w-full ${
                                formik.touched.quantity &&
                                formik.errors.quantity
                                ? "border-red-500"
                                : "border-gray-300"
                              }`}
                              />
                              <div className='flex items-center justify-center w-full h-[36px] col-span-2 border rounded-md border-gray-300'>
                                {selectedProduct?.unit?.name}
                              </div>
                              </div>
                            {formik.touched.quantity &&
                            formik.errors.quantity ? (
                              <div className="mt-1 text-sm text-red-500">
                                {formik.errors.quantity}
                              </div>
                            ) : null}
                          </div>

                          {/* total amount */}
                          <div className="mb-4">
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Total amount
                            </label>
                            <div className="block w-full mt-1 border-gray-300">
                              <Input
                                value={getTotalAmount()?.toLocaleString()}
                              />
                            </div>
                          </div>

                          {/* Submit Button */}
                          <Button
                            disabled={formik.isSubmitting || !quantity}
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            Submit
                          </Button>
                        </form>
                      </div>
                    </div>
                  </div>
                </>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

      <Button onClick={() => setDrawer(true)} className="w-full">
        Import Product
      </Button>
    </>
  )
}
