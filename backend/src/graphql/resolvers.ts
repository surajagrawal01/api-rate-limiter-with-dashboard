import { prisma } from "../db/client"
import { fetchUserLogs } from "../services/logService"
import { createPlan, listAllPlans, listAllPlansWithUserDetails, deletePlan } from "../services/planService"
import { getUsageForUser, resetUsageForUser } from "../services/usageService"
import { createUser, findUserById, rotateUserAPIKey } from "../services/userService"

export const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await prisma.user.findMany({
                include: {
                    plan: true,
                    usages: true
                }
            })
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
        getPlansWithUserDetails: async () => {
            const plansWithUsers = await listAllPlansWithUserDetails();
            return plansWithUsers;
        }

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
        createPlan: async (_: any, args: {
            input: {
                name: string,
                limit: number,
                window_seconds: number
            }
        }) => {
            const plan = await createPlan({
                name: args?.input?.name,
                limit: args?.input?.limit,
                window_seconds: args?.input?.window_seconds
            })
            return plan;
        },
        deletePlan: async (_: any, args: { id: number }) => {
            return deletePlan(args?.id)
        },
    },
    User: {
        logs: (parent: { id: number }) =>
            prisma.log.findMany({ where: { userId: parent.id } }),
        usages: (parent: { id: number }) =>
            prisma.usage.findMany({ where: { userId: parent.id } }),
    },
    Log: {
        //here the user comes from the Log -> so it can access parent means Log rows, and the args -> argument passed during query
        user: async (parent: any, args: { id: number }) => {
            // console.log({ parent }) //Here the parents are entire data getLogs query -> (array of Logs)-> 
            // Because there only we are trying to access info of User, as defined in typeDefs
            return findUserById({ id: args?.id })
        }

    }
}