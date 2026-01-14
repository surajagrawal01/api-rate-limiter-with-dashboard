import { prisma } from "../db/client";


type PlanCreateInput = {
    name: string,
    limit: number,
    window_seconds: number
}


export const findPlanById = async (planId: number) => {
    try {
        const plan = await prisma.plan.findFirst({
            where: { id: planId }
        })
        if (plan) return plan;
        return null;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const createPlan = async (planData: PlanCreateInput) => {
    try {
        const plan = await prisma.plan.create({
            data: {
                name: planData?.name,
                limit: planData?.limit,
                window_seconds: planData?.window_seconds
            }
        })
        return plan;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const listAllPlans = async () => {
    try {
        const plans = await prisma.plan.findMany();
        return plans;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const listAllPlansWithUserDetails = async () => {
    try {
        const plans = await prisma.plan.findMany({
            include: {
                users: true
            }
        })
        return plans;
    } catch (err) {
        console.log(err)
        return null
    }
}