export const CREATE_USER = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
        name
        usages {id, used}
        plan{id,name,limit}
    }
  }
`;
