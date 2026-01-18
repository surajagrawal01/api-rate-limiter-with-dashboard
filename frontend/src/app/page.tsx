"use client"

import * as React from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { AppDialog } from "@/components/dialog/dialog"
import { PlanService } from "@/services/plan.service";
import { DataTable } from "./users/data-table"
import { getPlanColumns } from "./users/columns"
import { User } from "@/types/user"
import { UserService } from "@/services/user.service"
import { UserForm } from "./users/user-form"

export default function Plans() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<User[]>([])

  React.useEffect(() => {
    const dataFunc = async () => {
      const usersData = await UserService.getUsers();
      setData(usersData?.getUsers)
    }
    dataFunc()
  }, [])

  const addData = (user: User) => {
    const updatedData = [...data, user]
    setData(updatedData)
  }

  const handleDelete = async (user: User) => {
    try {
      const planData = await PlanService.deletePlan(user?.id)
      const newData = data.filter((p) => p?.id !== user?.id)
      setData(newData)
    } catch (err) {
      console.log(err)
    }
  }


  const columns = getPlanColumns(handleDelete)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full p-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <AppDialog
          trigger={<Button variant="outline" className="m-4">Add User</Button>}
          title="Add User"
          description="Add user to your system here."
        >
          <UserForm addData={addData} />
        </AppDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTable table={table} />
    </div>
  )
}
