import { DateTimeTypeDefinition } from 'graphql-scalars'

export const typeDefs = `
    ${DateTimeTypeDefinition}

    type Usage {
        id:Int!
        userId:Int!
        used:Int!
        createdAt:DateTime!
        updatedAt:DateTime!
        window_start:DateTime!
        window_end:DateTime!
    }

    type Log{
        id:Int!
        endPoint:String!
        status:String!
        method:String!
        description:String!
        user:User!
        timestamp:DateTime!
    }

    type User {
        id:Int!
        name:String!
        email:String!
        api_key:String!
        planId:Int!
        usages:[Usage!]
        logs:[Log!]
        createdAt:DateTime!
        updatedAT:DateTime!
    }

    type Plan{
        id:Int!
        name:String!
        limit:Int!
        window_seconds:Int!
        createdAt:DateTime!
        updatedAt:DateTime!
    }

    type Query {
        getUsers: [User!]!
        getUserById(id: Int!): User
        getPlans: [Plan!]!
        getUsage(id:Int!):Usage
        getLogs:[Log!]!
    }

    input CreateUserInput {
        name: String!
        email: String!
        planId: Int!
    }   

    type Mutation{
        createUser(input:CreateUserInput!):User!
        resetUsage(id:Int!):Usage!
        rotateUserAPIKey(id:Int!):User!
    }
`