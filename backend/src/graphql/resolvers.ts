import { prisma } from "../db/client"
import { fetchUserLogs } from "../services/logService"
import { listAllPlans } from "../services/planService"
import { getUsageForUser, resetUsageForUser } from "../services/usageService"
import { createUser, findUserById, rotateUserAPIKey } from "../services/userService"

export const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await prisma.user.findMany()
            return users
        },
        getUserById: async (_: any, args: { id: number }) => {
            return await findUserById({ id: args?.id })
        },
        getPlans: async () => {
            const plans = await listAllPlans()
            return plans;
        },
        getUsage: async (_: any, args: { id: number }) => {
            return await getUsageForUser(args?.id)
        },
        getLogs: async (_: any, args: { id: number }) => {
            return await fetchUserLogs(args?.id)
        },
    },
    Mutation: {
        createUser: async (_: any, args: {
            input: {
                name: string,
                email: string,
                planId: number
            }
        }) => {
            const user = await createUser({
                name: args?.input?.name,
                email: args?.input?.email,
                planId: args?.input?.planId
            })
            return user;
        },
        resetUsage: async (_: any, args: { id: number }) => {
            return resetUsageForUser(args?.id)
        },
        rotateUserAPIKey: async (_: any, args: { id: number }) => {
            return rotateUserAPIKey(args?.id)
        },
    },
    User: {
        logs: (parent: { id: number }) =>
            prisma.log.findMany({ where: { userId: parent.id } }),
        usages: (parent: { id: number }) =>
            prisma.usage.findMany({ where: { userId: parent.id } }),
    },
}