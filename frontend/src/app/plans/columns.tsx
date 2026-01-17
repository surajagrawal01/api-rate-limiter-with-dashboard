import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plan } from "@/types/plan"
import { ArrowUpDown, Pencil, Trash } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Eye } from 'lucide-react';
import { AppDialog } from "@/components/dialog/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { DialogFooter } from "@/components/ui/dialog"

export const getPlanColumns = (
    handleDelete: (plan: Plan) => void
): ColumnDef<Plan>[] => [
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
            enableColumnFilter: true,
            filterFn: (row, id, value) => {
                const rowValue = row.getValue(id)
                console.log({ rowValue })
                return String(rowValue ?? "")
                    .toLowerCase()
                    .includes(String(value).toLowerCase())
            },
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
                            {/* <Button variant="ghost"><Eye /></Button> */}
                            <AppDialog
                                trigger={<Button variant="ghost"><Eye /></Button>}
                                title={`${plan?.name} Plan Info`}
                                description="Users Subscribed to this plan."
                            >
                                {plan?.users?.length > 0 ?
                                    <table className="p-6">
                                        <thead>
                                            <tr>
                                                <th className="w-[150px] px-6 border-2 border-solid">S.No</th>
                                                <th className="w-[150px] px-6 border-2 border-solid">Id</th>
                                                <th className="w-[150px] px-6 border-2 border-solid">Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                plan?.users?.map((user, i) => {
                                                    return (
                                                        <tr key={user?.id}>
                                                            <td className="text-center w-[150px] px-6 border-2 border-solid">{i + 1}</td>
                                                            <td className="text-center w-[150px] px-6 border-2 border-solid">{user?.id}</td>
                                                            <td className="text-center w-[150px] px-6 border-2 border-solid">{user?.name}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <p className="text-sm text-muted-foreground">
                                        {`No one have subscribed to this plan.`}
                                    </p>
                                }
                            </AppDialog>
                            <AppDialog
                                trigger={<Button variant="ghost"><Trash /></Button>}
                                title={`Delete Plan`}
                                description="Delete plan from the system."
                            >
                                <p className="text-sm text-muted-foreground">
                                    {`Are you sure you want to delete this ${plan?.name} plan?`}
                                </p>
                                <DialogFooter className="mt-10">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button variant="destructive" onClick={() => handleDelete(plan)}>Delete</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </AppDialog>
                        </div >
                    </>
                )
            },
        },
    ]