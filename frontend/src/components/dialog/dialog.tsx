import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

type AppDialogProps = {
    trigger: ReactNode
    title: string
    description?: string
    children: ReactNode
    footer?: ReactNode
}

export function AppDialog({
    trigger,
    title,
    description,
    children,
    footer,
}: AppDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                {/* MAIN BODY */}
                <div className="py-4">{children}</div>
            </DialogContent>
        </Dialog>
    )
}
