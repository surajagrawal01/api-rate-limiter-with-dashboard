import { graphqlClient } from "@/graphql/client";
import { CREATE_USER } from "@/graphql/mutation/user.mutation";
import { GET_USERS } from "@/graphql/queries/user.queries";
import { CreateUserResponse, GetUsersResponse } from "@/graphql/types";

export const UserService = {
    getUsers: async () => {
        return graphqlClient<GetUsersResponse>(GET_USERS);
    },
    createUser: async (input: { name: string; email: string, planId: number }) => {
        return graphqlClient<CreateUserResponse>(CREATE_USER, { input });
    },
};