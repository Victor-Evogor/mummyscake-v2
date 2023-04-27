import { gql } from "@apollo/client";

export const GET_ALL_CAKES_NAME = gql`
query ExampleQuery {
  getAllCakes {
    id
    name
  }
}
`