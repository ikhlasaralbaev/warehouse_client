import {
  ColumnDef,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import React from "react"
import { confirmAlert } from "react-confirm-alert" // Import
import "react-confirm-alert/src/react-confirm-alert.css" // Import css

import { useAppDispatch, useAppSelector } from "@/hooks"
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table"
import toast from "react-hot-toast"
import { BiTrash } from "react-icons/bi"
import {
  deleteProduct as deleteProductAction,
  getWarehouseProductsAction,
} from "../store/warehouse.actions"
import { Input } from "@/components/ui/input"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import { addToChangePrice } from "@/features/warehouse/store/warehouse.slice"

const debounce = (func: (...args: any) => void, delay: number) => {
  setTimeout(() => {
    func()
  }, delay)
}

const useProductsTableData = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { products } = useAppSelector((state) => state.warehouse)
  const dispatch = useAppDispatch()

  const deleteProduct = (product_id: string) => {
    confirmAlert({
      title: "Do you want delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteProductAction({ product_id })).then((res) => {
              if (res.type === "warehouse/delete-product/fulfilled") {
                toast.success("Product deleted successfully!")
                dispatch(getWarehouseProductsAction())
              }
            })
          },
        },
        {
          label: "No",
        },
      ],
    })
  }

  console.log(products)

  const warehouseColumns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "id",
      header: () => <div className="text-right">Cost price</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end font-medium text-right">
            <Input
              className="w-[100px]"
              value={row.original.price}
              onChange={(e) => {
                dispatch(
                  addToChangePrice({
                    id: row.original.id,
                    new_price: +e.target.value,
                  })
                )
              }}
            />
          </div>
        )
      },
    },
    {
      accessorKey: "id",
      header: () => <div className="text-right">Sell price</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end font-medium text-right">
            <Input
              className="w-[100px]"
              value={row.original.sellPrice}
              onChange={(e) => {
                dispatch(
                  addToChangePrice({
                    id: row.original.id,
                    new_sell_price: +e.target.value,
                  })
                )
              }}
            />
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button className="bg-green-500 hover:bg-green-600 " size={"icon"}>
              <CheckCircleIcon />
            </Button>

            <div className="h-12 w-[1px] bg-slate-200 mx-2" />
            <Button
              onClick={() => {
                deleteProduct(String(row.original.id))
              }}
              size={"icon"}
              className="w-8 h-8 bg-red-500 hover:bg-red-600"
            >
              <BiTrash className="text-xl" />
            </Button>
          </div>
        )
      },
    },
  ]
  const table = useReactTable({
    data: products,
    columns: warehouseColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return table
}

export default useProductsTableData
