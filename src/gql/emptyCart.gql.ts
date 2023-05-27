import { gql } from "@apollo/client"

export const EMPTY_CART = gql`
mutation EmptyCart($userId: ID) {
  emptyCart(userId: $userId) {
    uid
    orders {
      id
      status
      value
      items {
        id
        name
        price
      }
    }
    cart {
      value
      items {
        id
        name
        price
      }
    }
  }
}
`