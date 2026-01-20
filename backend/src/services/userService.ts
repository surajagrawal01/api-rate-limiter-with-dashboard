import { prisma } from "../db/client";

type UserCreateInput = {
    email: string,
    name: string,
    planId: number
}

function generateRandomAPIKeys() {
    const randomKey = Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 4);
    return randomKey.toUpperCase()
}

export const findUserByAPIKey = async (apiKey: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                api_key: apiKey
            },
            include: {
                plan: true
            }
        })
        if (user) return user;
        return null;
    } catch (err) {
        console.log(err)
        return null
    }
}


export const findUserById = async ({ id }: { id: number }) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
            include: {
                plan: true
            }
        })
        if (user) return user;
        return null;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const createUser = async (userData: UserCreateInput) => {
    try {
        const apiKey = generateRandomAPIKeys()
        const user = await prisma.user.create({
            data: {
                email: userData.email,
                name: userData.name,
                api_key: apiKey,
                planId: userData.planId
            },
            include: {
                plan: true
            }
        })
        return user;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const rotateUserAPIKey = async (userId: number) => {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { api_key: generateRandomAPIKeys() },
            include: {
                plan: true
            }
        })
        if (user) return true;
        return false;
    } catch (err) {
        console.log(err)
        return null
    }
}