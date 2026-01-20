import { graphqlClient } from "@/graphql/client";
import { RESET_USER_API_KEY } from "@/graphql/mutation/plan.mutation";
import { CREATE_USER } from "@/graphql/mutation/user.mutation";
import { GET_USERS } from "@/graphql/queries/user.queries";
import { CreateUserResponse, GetUsersResponse, ResetUserAPIKeyResponse } from "@/graphql/types";

export const UserService = {
    getUsers: async () => {
        return graphqlClient<GetUsersResponse>(GET_USERS);
    },
    createUser: async (input: { name: string; email: string, planId: number }) => {
        return graphqlClient<CreateUserResponse>(CREATE_USER, { input });
    },
    resetUserAPIKey: async (userId: number) => {
        return graphqlClient<ResetUserAPIKeyResponse>(RESET_USER_API_KEY, { userId })
    }
};