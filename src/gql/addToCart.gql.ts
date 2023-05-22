import { gql } from "@apollo/client"

export const ADD_TO_CART = gql`
mutation AddToCart($userId: ID, $cakeId: ID) {
  addToCart(userId: $userId, cakeId: $cakeId) {
    cart {
      value
      items {
        name
        price
        id
      }
    }
  }
}
`