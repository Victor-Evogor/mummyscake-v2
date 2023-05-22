import {gql} from "@apollo/client";

export const REMOVE_FROM_CART = gql`
mutation RemoveFromCart($userId: ID, $cakeId: ID) {
  removeFromCart(userId: $userId, cakeId: $cakeId) {
    cart {
      items {
        name
        id
        price
      }
      value
    }
  }
}
`