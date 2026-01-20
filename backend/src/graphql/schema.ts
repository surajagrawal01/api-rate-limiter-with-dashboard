import { DateTimeTypeDefinition } from 'graphql-scalars'

/*

    //-->In type Usage userId is defined so we can't access user (in order to access user row we need to define here and then in the resolver)
    type Usage {
        id:Int! 
        userId:Int!
        used:Int!
        createdAt:DateTime!
        updatedAt:DateTime!
        window_start:DateTime!
        window_end:DateTime!
    }

    //---> Here we have defined user so we can populate means we can get the information of user like id, name, email, api_key etc.
    //---> (we also defined User for Log in resolver in order to get user info along with Logs)
    type Log{
        id:Int!
        endPoint:String!
        status:String!
        method:String!
        description:String!
        user:User!
        timestamp:DateTime!
    }

*/
export const typeDefs = `
    ${DateTimeTypeDefinition}

    type PlanWithUser{
        id:Int!
        name:String!
        window_seconds:Int!
        createdAt:DateTime!
        updatedAt:DateTime!
        limit:Int!
        users:[User]
    }

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
        plan:Plan!
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
        getUserById(id: Int!): User!
        getPlans: [Plan!]!
        getUsage(id:Int!):Usage!
        getLogs(id:Int!):[Log!]!
        getPlansWithUserDetails:[PlanWithUser!]!
    }

    input CreateUserInput {
        name: String!
        email: String!
        planId: Int!
    }   

    input CreatePlanInput {
        name: String!
        limit: Int!
        window_seconds: Int!
    } 

    type Mutation{
        createUser(input:CreateUserInput!):User!
        resetUsage(id:Int!):Usage!
        rotateUserAPIKey(id:Int!):Boolean!
        createPlan(input:CreatePlanInput!):Plan!
        deletePlan(id:Int!):Plan!
    }
`