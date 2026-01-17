import { graphqlClient } from "@/graphql/client";
import { CREATE_PLAN, DELETE_PLAN } from "@/graphql/mutation/plan.mutation";
import { GET_PLANS_WITH_USERS } from "@/graphql/queries/plan.queries";
import { CreatePlanResponse, DeletePlanResponse, GetPlansResponse } from "@/graphql/types";

export const PlanService = {
    getPlans: async () => {
        return graphqlClient<GetPlansResponse>(GET_PLANS_WITH_USERS);
    },
    createPlan: async (input: { name: string; window_seconds: number, limit: number }) => {
        return graphqlClient<CreatePlanResponse>(CREATE_PLAN, { input });
    },
    deletePlan: async (planId: number) => {
        return graphqlClient<DeletePlanResponse>(DELETE_PLAN, { planId })
    }
};