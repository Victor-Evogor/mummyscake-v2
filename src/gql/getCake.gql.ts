import { gql } from "@apollo/client";

export const GET_CAKE = gql`
query GET_CAKE($id: ID) {
  getCake(id: $id) {
    name
    description
    price
    weight
    flavors
    ingredients
    image
    rating
    reviews {
      user
      rating
      comment
    }
    delivery_info {
        available
        shipping_cost
        estimated_delivery_time
    }
    size {
        diameter
        height
        serving_size
    },
    occasion
    allergens
    nutritional_info {
        calories
        fat
        sugar
        protein
    }
  }
}
`