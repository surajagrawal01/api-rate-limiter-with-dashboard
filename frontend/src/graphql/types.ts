import { Plan } from "@/types/plan";

export type GetPlansResponse = {
    getPlansWithUserDetails: Plan[]
}

export type PartialPlanType = Pick<Plan, "name" | "window_seconds" | "limit" | "id">

export type CreatePlanResponse = {
    createPlan: PartialPlanType;
}

export type DeletePlanResponse = PartialPlanType;