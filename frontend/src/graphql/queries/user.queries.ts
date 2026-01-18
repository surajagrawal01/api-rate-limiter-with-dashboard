export const GET_USERS = `
    query getUsers {
        getUsers{
            id
            name
            usages {id, used}
            plan{id,name,limit}
    }
}`
