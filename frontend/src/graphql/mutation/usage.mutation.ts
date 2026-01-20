export const RESET_USAGE_FOR_USER = `
mutation ResetUsage($userId: Int!) {
    resetUsage(id: $userId) {
         userId
  }
}`