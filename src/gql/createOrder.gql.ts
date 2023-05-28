import { gql } from "@apollo/client"

export const CREATE_ORDER = gql`
mutation Mutation($userId: ID, $input: OrderInput) {
  createOrder(userId: $userId, input: $input) {
    id
    items {
      id
    }
    status
    value
    createdAt
  }
}
`