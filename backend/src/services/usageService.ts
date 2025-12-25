import { prisma } from "../db/client";
import { findUserById } from "./userService";

type UsageData = {
    userId: number,
    used: number,
    window_seconds: number
}

export const getUsageForUser = async (userId: number) => {
    try {

        const usage = await prisma.usage.findFirst({
            where: {
                userId: userId
            }
        })
        return usage;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const createUsageForUser = async (data: UsageData) => {
    try {
        const date = new Date();
        const usage = await prisma.usage.create({
            data: {
                userId: data?.userId,
                window_start: new Date(),
                window_end: new Date(date.setTime(date.getTime() + (data?.window_seconds * 1000))),
                used: 1
            }
        })
        return usage;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const increaseUsageForUser = async (userId: number) => {
    try {
        const usage = await prisma.usage.updateMany({
            where: {
                userId: userId
            },
            data: {
                used: {
                    increment: 1
                }
            }
        })
        return usage;
    } catch (err) {
        console.log(err)
        return null;
    }
}

export const resetUsageForUser = async (userId: number, windowSeconds?: number) => {
    try {
        const date = new Date()
        let user
        if (!windowSeconds) {
            user = await findUserById({ id: userId })
        }
        const windowTime =
            windowSeconds ?? user?.plan?.window_seconds;

        if (windowTime == null) {
            throw new Error("windowSeconds or plan.window_seconds must be provided");
        }
        const usage = await prisma.usage.update({
            where: {
                userId: userId
            },
            data: {
                used: {
                    set: 0
                },
                window_start: new Date(),
                window_end: new Date(date.setTime(date.getTime() + (windowTime * 1000))),
            }
        })
        return usage;
    } catch (err) {
        console.log(err)
        return null;
    }
}

export const checkWindowExpiredOrNot = async (userId: number) => {
    try {
        const date = new Date()
        const usage = await prisma.usage.findFirst({
            where: {
                userId: userId
            }
        })
        if (usage) {
            if (usage?.window_start <= date && (usage.window_end && usage?.window_end >= date)) {
                return false
            } else {
                return true
            }
        } else {
            return { msg: "no usage found" }
        }
    } catch (err) {
        console.log(err)
        return null
    }
}

export const checkUserAllowedBasedOnCount = async (userId: number, limit: number) => {
    try {
        const usage = await prisma.usage.findFirst({
            where: {
                userId: userId
            }
        })
        if (usage) {
            return usage?.used < limit ? true : false
        }
        return false;
    } catch (err) {
        console.log(err)
        throw new Error("user not found")
    }
}