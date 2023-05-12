import { gql } from "@apollo/client";

export const GET_ALL_CAKES_FAVORITE = gql`
query ExampleQuery {
  getAllCakes {
    id
    favorites
  }
}
`