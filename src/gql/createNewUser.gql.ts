import { gql } from "@apollo/client"
import { Cake } from "../types/Cake"

export const CREATE_NEW_USER = gql`
mutation CreateUser($userId: ID) {
  createUser(userId: $userId) {
    uid
    cart {
      value
      items{
        id
        name
        price
      }
    }
  }
}

`

export interface CreateNewUserType {
  createUser: {
    uid: string,
    cart: {
      value: number,
      items: Cake[]
    }
  }
}