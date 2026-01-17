export const GET_PLANS_WITH_USERS = `
    query getPlansWithUserDetails {
        getPlansWithUserDetails{
            id,
            name,
            window_seconds,
            limit,
            createdAt,
            updatedAt,
            users{
                id,
                name
            }
    }
}`
