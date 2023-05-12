import { gql } from "@apollo/client";

export const FAVORITE_CAKE = gql`
  mutation Mutation($favoriteCakeId: ID, $userId: String) {
    favoriteCake(id: $favoriteCakeId, userId: $userId) {
      favorites
    }
  }
`;
