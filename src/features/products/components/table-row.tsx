import { TableHead, TableRow } from "@/components/ui/table"
import { flexRender, HeaderGroup } from "@tanstack/react-table"
import React, { memo } from "react"

const ProductTableRow = memo(
  ({ headerGroup }: { headerGroup: HeaderGroup<any> }) => {
    return (
      <TableRow>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          )
        })}
      </TableRow>
    )
  }
)

export default ProductTableRow
