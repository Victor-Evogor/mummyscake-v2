import { gql } from "@apollo/client";

export const GET_CAKE = gql`
query GET_CAKE($id: String) {
  getCake {
    name
    description
    price
    weight
    flavors
    ingredients
    image
    rating
    reviews
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