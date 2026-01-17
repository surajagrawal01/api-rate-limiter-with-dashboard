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
import { getPlanColumns } from "./columns"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { DataTable } from "./data-table"
import { AppDialog } from "@/components/dialog/dialog"
import { PlanForm } from "./plan-form"
import { PlanService } from "@/services/plan.service";
import { Plan } from "@/types/plan"
import { PartialPlanType } from "@/graphql/types"

export default function Plans() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [data, setData] = React.useState<Plan[]>([])

    React.useEffect(() => {
        const dataFunc = async () => {
            const plansData = await PlanService.getPlans();
            setData(plansData?.getPlansWithUserDetails);
        }
        dataFunc()
    }, [])

    const addData = (plan: PartialPlanType) => {
        const newData = [...data, { ...plan, users: [] }]
        setData(newData)
    }

    const handleDelete = async (plan: Plan) => {
        try {
            const planData = await PlanService.deletePlan(plan?.id)
            const newData = data.filter((p) => p?.id !== plan?.id)
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
                    trigger={<Button variant="outline" className="m-4">Add Plan</Button>}
                    title="Add Plan"
                    description="Add Plan to your system here."
                >
                    <PlanForm addData={addData} />
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
