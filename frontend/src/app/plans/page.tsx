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
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { DataTable } from "./data-table"
import { Plan } from "@/types/plan"
import { AppDialog } from "@/components/dialog/dialog"
import { PlanForm } from "./plan-form"

const data: Plan[] = [
    {
        "id": 3,
        "name": "Ultra Premium",
        "window_seconds": 86400,
        "limit": 100,
        "createdAt": "2025-12-25T13:06:46.669Z",
        "updatedAt": "2025-12-25T13:06:46.669Z",
        "users": [
            {
                "id": 3,
                "name": "Pratik"
            }
        ]
    },
    {
        "id": 1,
        "name": "Free",
        "window_seconds": 60,
        "limit": 500,
        "createdAt": "2025-12-25T13:05:52.534Z",
        "updatedAt": "2025-12-25T13:30:30.137Z",
        "users": [
            {
                "id": 1,
                "name": "Suraj"
            },
            {
                "id": 4,
                "name": "Tanu"
            }
        ]
    },
    {
        "id": 2,
        "name": "Premium",
        "window_seconds": 60,
        "limit": 5,
        "createdAt": "2025-12-25T13:06:36.343Z",
        "updatedAt": "2025-12-25T13:50:13.746Z",
        "users": [
            {
                "id": 2,
                "name": "Shubham"
            }
        ]
    }
]

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}


export default function Plans() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
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
                    trigger={<Button variant="outline" className="m-4">Add Plan</Button>}
                    title="Add Plan"
                    description="Add Plan to your system here."
                >
                    <PlanForm />
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
            <DataTable columns={columns} data={data} />

        </div>
    )
}
