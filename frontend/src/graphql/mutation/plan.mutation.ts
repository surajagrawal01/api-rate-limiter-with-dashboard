export const CREATE_PLAN = `
  mutation CreatePlan($input: CreatePlanInput!) {
    createPlan(input: $input) {
        id
        name
        limit
        window_seconds
    }
  }
`;

export const DELETE_PLAN = `
  mutation DeletePlan($planId: Int!){
    deletePlan(id: $planId){
      id
      name
      limit
      window_seconds
    }
  }
`