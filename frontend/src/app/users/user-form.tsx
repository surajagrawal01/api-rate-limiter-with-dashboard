"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlanService } from "@/services/plan.service";
import { UserService } from "@/services/user.service";
import { Plan } from "@/types/plan";
import { User } from "@/types/user";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";

type FormValues = {
    name: string,
    email: string,
    planId: number
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type PlanFormPropsType = {
    addData: (uses: User) => void
}

type PlanInfo = Pick<Plan, "id" | "name">

export function UserForm({ addData }: PlanFormPropsType) {

    const [form, setForm] = useState<FormValues>({
        name: '',
        email: '',
        planId: 0
    })
    const [plan, setPlan] = useState<PlanInfo[]>([])
    const [errors, setErrors] = useState<FormErrors>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log({ name, value })
        setForm((prevValue) => ({
            ...prevValue,
            [name]: value
        }))
        setErrors((prevValue) => ({
            ...prevValue,
            [name]: ''
        }))
    }


    React.useEffect(() => {
        const dataFunc = async () => {
            const plansData = await PlanService.getPlans();
            setPlan(plansData?.getPlansWithUserDetails);
        }
        dataFunc()
    }, [])


    const validateField = (
        name: keyof FormValues,
        value: string | number
    ): string => {
        switch (name) {
            case "name":
                if (!value) return "Field is required";
                if (String(value).length < 3) return "At least 3 characters";
                break;

            case "email":
                if (!value) return "Field is required"
                if (String(value).length < 7) return "Provide a valid mail id"

            case "planId":
                if (!value) return "Field is required"
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
            email: '',
            planId: 0
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            console.log({ form })

            const validationErrors = validateForm();
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) {
                return;
            }

            const data = await UserService?.createUser(
                {
                    name: form?.name,
                    email: form?.email,
                    planId: Number(form?.planId)
                }
            )
            addData(data?.createUser)
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
                        placeholder="John Doe"
                        value={form?.name}
                        onChange={(e) => handleInputChange(e)}
                        onBlur={(e) => handleBlur(e)}
                    />
                    {errors?.name && <div className="text-sm text-red-500">{errors?.name}</div>}
                </div>

                <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                        name="email"
                        placeholder="john@gmail.com"
                        value={form?.email}
                        onChange={(e) => handleInputChange(e)}
                        onBlur={(e) => handleBlur(e)} />
                    {errors?.email && <div className="text-sm text-red-500">{errors?.email}</div>}
                </div>

                <div className="grid gap-2">
                    <Label >Plan</Label>
                    <select name="planId" value={form?.planId} onChange={(e) => handleInputChange(e)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        {
                            plan?.map((p) => {
                                return (
                                    <option key={p?.id} value={p?.id}>{p?.name}</option>
                                )
                            })
                        }
                    </select>
                    {errors?.email && <div className="text-sm text-red-500">{errors?.email}</div>}
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
