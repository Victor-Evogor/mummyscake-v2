import { gql } from "@apollo/client";

export const UN_FAVORITE_CAKE = gql`
mutation Mutation($favoriteCakeId: ID, $userId: String) {
  unFavoriteCake(id: $favoriteCakeId, userId: $userId) {
    favorites
  }
}
`