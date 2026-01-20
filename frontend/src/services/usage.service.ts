import { graphqlClient } from "@/graphql/client";
import { RESET_USAGE_FOR_USER } from "@/graphql/mutation/usage.mutation";
import { ResetUsageForUser } from "@/graphql/types";

export const UsageService = {
    resetUsage: async (userId: number) => {
        return graphqlClient<ResetUsageForUser>(RESET_USAGE_FOR_USER, { userId });
    },
};