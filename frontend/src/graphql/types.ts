import { Plan } from "@/types/plan";
import { User } from "@/types/user";

export type GetPlansResponse = {
    getPlansWithUserDetails: Plan[]
}

export type PartialPlanType = Pick<Plan, "name" | "window_seconds" | "limit" | "id">

export type CreatePlanResponse = {
    createPlan: PartialPlanType;
}

export type DeletePlanResponse = PartialPlanType;

export type GetUsersResponse = {
    getUsers: User[]
}

export type CreateUserResponse = {
    createUser: User
}

export type ResetUserAPIKeyResponse = {
    rotateUserAPIKey: Boolean
}