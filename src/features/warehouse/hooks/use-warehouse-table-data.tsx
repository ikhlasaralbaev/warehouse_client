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
import { BiCartAdd, BiCheckCircle, BiTrash } from "react-icons/bi"
import {
  deleteProduct as deleteProductAction,
  getWarehouseProductsAction,
} from "../store/warehouse.actions"
import { addToBasket } from "../store/warehouse.slice"
import { IProduct } from "../types"

const useWarehouseTableData = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const { products, basket } = useAppSelector((state) => state.warehouse)
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

  const warehouseColumns: ColumnDef<IProduct>[] = [
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
      accessorKey: "quantity",
      header: () => {
        return <div className="capitalize">Quantity</div>
      },
      cell: ({ row }) => (
        <div className="lowercase">
          <b>{Number(row.getValue("quantity") || 0)?.toLocaleString()}</b>{" "}
          {row.original.unit.name}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className="font-medium text-right">{formatted}</div>
      },
    },
    {
      accessorKey: "sellPrice",
      header: () => <div className="text-right">Sell price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("sellPrice"))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className="font-medium text-right">{formatted}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            {basket.find((item) => item.id === row.original.id) ? (
              <Button
                size={"icon"}
                className="w-8 h-8 bg-green-500 hover:bg-green-600"
              >
                <BiCheckCircle />
              </Button>
            ) : (
              <Button
                disabled={row.original.quantity === 0}
                onClick={() => {
                  dispatch(
                    addToBasket({
                      add_quantity: 1,
                      ...row.original,
                    })
                  )
                }}
                size={"icon"}
                className="w-8 h-8 bg-blue-500 hover:bg-blue-600"
              >
                <BiCartAdd className="text-xl" />
              </Button>
            )}
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

export default useWarehouseTableData
