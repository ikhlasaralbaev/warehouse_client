"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"
import { BiCheckCircle, BiTrash } from "react-icons/bi"
import { TbBasketX } from "react-icons/tb"
import {
  getWarehouseProductsAction,
  incomeProduct,
} from "../store/warehouse.actions"
import {
  changeBasketItemQuantity,
  removeFromBasket,
} from "../store/warehouse.slice"

export default function BasketDrawer({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const { basket } = useAppSelector((state) => state.warehouse)
  const dispatch = useAppDispatch()

  const handleIncome = (product_id: number, quantity: number) => {
    dispatch(
      incomeProduct({
        product: product_id,
        quantity: quantity,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.product) {
          toast.success("Transaction completed successfully!")
          dispatch(removeFromBasket({ id: product_id }))
          dispatch(getWarehouseProductsAction())
          if (basket.length === 1) {
            setOpen(false)
          }
        } else {
          toast.error("Something went wrong!")
        }
      })
  }

  return (
    <Dialog open={open} onClose={setOpen} className={"z-50 relative"}>
      <div className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-4xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 "
            >
              <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Basket
                    </DialogTitle>
                    <div className="flex items-center ml-3 h-7">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative flex-1 px-4 mt-6 sm:px-6">
                  <div className="flex items-stretch justify-between p-2 mb-2 font-semibold border rounded-lg border-slate-100 bg-slate-100">
                    <div className="flex flex-col items-start justify-start h-full ">
                      <h1>Product</h1>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="pr-[20px]">Add count</span>
                      <div className="min-h-[20px] w-[1px] bg-slate-200 mx-2" />
                      <span className="w-[100px] text-center">Total price</span>
                      <div className="min-h-[20px] w-[1px] bg-slate-200 mx-2" />
                      <div className="items-center gap-1 min-w-[122px] text-center flex justify-center">
                        <span>Actions</span>
                      </div>
                    </div>
                  </div>
                  {basket.length === 0 ? (
                    <div className="w-full p-[50px] bg-gray-50 border-2 border-gray-200 rounded-xl flex items-center justify-center flex-col">
                      <TbBasketX className="text-[100px] text-slate-300" />
                      <h1 className="text-4xl text-slate-300">
                        Basket is empty!
                      </h1>
                    </div>
                  ) : (
                    basket.map((item) => {
                      return (
                        <div className="flex items-stretch justify-between p-2 mb-2 font-semibold border rounded-lg border-slate-100">
                          <div className="flex flex-col items-start justify-start h-full ">
                            <h1>{item.name}</h1>
                            <span className="text-sm font-medium border-slate-500">
                              {item.price.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="pr-[20px]">{item.quantity} /</span>
                            <Input
                              className="h-full w-[100px]"
                              defaultValue={1}
                              max={item.quantity}
                              onChange={(e) => {
                                dispatch(
                                  changeBasketItemQuantity({
                                    id: item.id,
                                    quantity: +e.target.value,
                                  })
                                )
                              }}
                            />
                            <div className="min-h-[50px] w-[1px] bg-slate-200 mx-2" />
                            <Input
                              className="h-full w-[100px]"
                              value={(
                                item.price * item.add_quantity
                              ).toLocaleString()}
                              readOnly
                            />
                            <div className="min-h-[50px] w-[1px] bg-slate-200 mx-2" />
                            <div className="flex items-center gap-1">
                              <Button
                                onClick={() => {
                                  dispatch(removeFromBasket({ id: item.id }))
                                }}
                                className="w-12 h-[45px] bg-red-500 hover:bg-red-600"
                                size={"icon"}
                              >
                                <BiTrash className="text-2xl" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
