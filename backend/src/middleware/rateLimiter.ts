import { insertLog } from "../services/logService";
import { checkUserAllowedBasedOnCount, checkWindowExpiredOrNot, createUsageForUser, getUsageForUser, increaseUsageForUser, resetUsageForUser } from "../services/usageService";
import { findUserByAPIKey } from "../services/userService"
import { Request, Response, NextFunction } from "express";

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const apiKey = req.headers["x-api-key"] as string;
        if (!apiKey) {
            return res.status(401).json({ status: "BLOCKED", error: "API key missing" });
        }
        const endPoint = req.originalUrl;
        const method = req.method;

        const user = await findUserByAPIKey(apiKey)
        let userAllowed = false
        if (!user) throw new Error("User not found")
        const plan = user.plan;
        if (!plan) throw new Error("no plan associated")
        const usage = await getUsageForUser(user?.id)
        if (!usage) {
            const newUsage = await createUsageForUser({
                userId: user?.id,
                used: 1,
                window_seconds: plan?.window_seconds
            })
            await insertLog({
                userId: user?.id,
                endPoint,
                status: "SUCCESS",
                method,
                description: "allowed"
            })
            next();
            return;
        }
        const windowExpired = await checkWindowExpiredOrNot(user?.id)
        if (windowExpired && plan?.name?.toLowerCase() === "free") {
            await insertLog({
                userId: user?.id,
                endPoint,
                status: "BLOCKED",
                method,
                description: "userNotAllowed"
            })
            res.json({ error: 401, status: "BLOCKED" })
        }
        if (windowExpired) {
            await resetUsageForUser(user?.id, plan?.window_seconds)
            userAllowed = true
        } else {
            userAllowed = await checkUserAllowedBasedOnCount(user?.id, plan?.limit)
        }

        if (userAllowed) {
            await increaseUsageForUser(user?.id)
            await insertLog({
                userId: user?.id,
                endPoint,
                status: "SUCCESS",
                method,
                description: "allowed"
            })
            next()
        } else {
            await insertLog({
                userId: user?.id,
                endPoint,
                status: "BLOCKED",
                method,
                description: "userNotAllowed"
            })
            res.json({ error: 401, status: "BLOCKED" })
        }
    } catch (err) {
        console.log(err)
        return null
    }
}