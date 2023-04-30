import { gql } from "@apollo/client";

export const GET_ALL_CAKES = gql`
  query ExampleQuery($limit: Int) {
    getAllCakes(limit: $limit) {
      id
      name
      image
      description
      price
      size {
        diameter
        serving_size
        height
      }
    }
  }
`;
