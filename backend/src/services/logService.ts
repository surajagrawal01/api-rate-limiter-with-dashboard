import { prisma } from "../db/client";

type LogData = {
    userId: number,
    endPoint: string,
    status: string,
    method: string,
    description: string
}

export const insertLog = async (logData: LogData) => {
    try {
        const log = await prisma.log.create({
            data: {
                ...logData
            }
        })
        return log;
    } catch (err) {
        console.log(err)
        return null
    }
}

export const fetchLogs = async (userId: number) => {
    try {
        const logs = await prisma.log.findMany({
            where: {
                userId: userId
            }
        })
        return logs;
    } catch (err) {
        console.log(err)
        return null
    }
}