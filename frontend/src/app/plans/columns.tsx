import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plan } from "@/types/plan"
import { ArrowUpDown, Pencil, Trash } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from 'lucide-react';

export const columns: ColumnDef<Plan>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}

                    >
                        Name
                        <ArrowUpDown />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="text-center uppercase">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "window_seconds",
        header: () => <div className="text-center">Window Seconds</div>,
        cell: ({ row }) => {
            const window_seconds = parseFloat(row.getValue("window_seconds"))

            return <div className="text-center font-medium">{window_seconds}</div>
        },
    },
    {
        accessorKey: "limit",
        header: () => <div className="text-center">Limit</div>,
        cell: ({ row }) => {
            const limit = parseFloat(row.getValue("limit"))

            return <div className="text-center font-medium">{limit}</div>
        },
    },
    {
        id: "actions",
        header: () => <div className="text-center">Action</div>,
        cell: ({ row }) => {
            const plan = row.original
            return (
                <>
                    <div className="flex justify-center items-center">
                        {/* <Button variant="ghost"><Pencil /></Button> */}
                        <Button variant="ghost"><Eye /></Button>
                        <Button variant="ghost"><Trash /></Button>
                    </div >
                </>
            )
        },
    },
]