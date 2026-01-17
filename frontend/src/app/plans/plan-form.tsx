"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PartialPlanType } from "@/graphql/types";
import { PlanService } from "@/services/plan.service";
import { Plan } from "@/types/plan";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

type FormValues = Pick<Plan, "name" | "window_seconds" | "limit">

type FormErrors = Partial<Record<keyof FormValues, string>>

type PlanFormPropsType = {
    addData: (plan: PartialPlanType) => void
}

export function PlanForm({ addData }: PlanFormPropsType) {

    const [form, setForm] = useState<FormValues>({
        name: '',
        window_seconds: 0,
        limit: 0
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevValue) => ({
            ...prevValue,
            [name]: value
        }))
        setErrors((prevValue) => ({
            ...prevValue,
            [name]: ''
        }))
    }

    const validateField = (
        name: keyof FormValues,
        value: string | number
    ): string => {
        switch (name) {
            case "name":
                if (!value) return "Field is required";
                if (String(value).length < 3) return "At least 3 characters";
                break;

            case "window_seconds":
                if (Number(value) <= 0) return "Must be greater than 0";
                break;

            case "limit":
                if (Number(value) <= 0) return "Must be greater than 0";
                break;
        }
        return "";
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const error = validateField(
            name as keyof FormValues,
            value
        );

        setErrors(prev => ({
            ...prev,
            [name]: error,
        }));
    };

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        (Object.keys(form) as (keyof FormValues)[]).forEach((key) => {
            const error = validateField(key, form[key]);
            if (error) newErrors[key] = error;
        });

        //--->For Looping over the object and accessing its key and value
        // for (const key in form) {
        //     console.log({ key, value: form[key as keyof FormValues] })
        // }

        return newErrors;
    };

    const resetForm = () => {
        setForm({
            name: '',
            window_seconds: 0,
            limit: 0
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            const validationErrors = validateForm();
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) {
                return;
            }

            const data = await PlanService?.createPlan(
                {
                    name: form?.name,
                    window_seconds: Number(form?.window_seconds),
                    limit: Number(form?.limit)
                }
            )
            addData(data?.createPlan)
            resetForm()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <Label>Name</Label>
                    <Input
                        name="name"
                        placeholder="Premium"
                        defaultValue="Premium"
                        value={form?.name}
                        onChange={(e) => handleInputChange(e)}
                        onBlur={(e) => handleBlur(e)}
                    />
                    {errors?.name && <div className="text-sm text-red-500">{errors?.name}</div>}
                </div>

                <div className="grid gap-2">
                    <Label>Window Seconds</Label>
                    <Input
                        type="number"
                        min={0}
                        placeholder="86400"
                        name="window_seconds"
                        defaultValue="86400"
                        value={form?.window_seconds}
                        onChange={(e) => handleInputChange(e)}
                        onBlur={(e) => handleBlur(e)} />
                    {errors?.window_seconds && <div className="text-sm text-red-500">{errors?.window_seconds}</div>}
                </div>

                <div className="grid gap-2">
                    <Label>Limit</Label>
                    <Input
                        type="number"
                        min={0}
                        placeholder="50"
                        name="limit"
                        defaultValue="50"
                        value={form?.limit}
                        onChange={(e) => handleInputChange(e)}
                        onBlur={(e) => handleBlur(e)} />
                    {errors?.limit && <div className="text-sm text-red-500">{errors?.limit}</div>}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button type="submit" >Save</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </>
    )
}
