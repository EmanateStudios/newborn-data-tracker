import { gql } from "@apollo/client";

export const GET_USER_RECORDS = gql`
  query GET_USER_RECORDS($id: uuid) {
    Record(where: { User: { id: { _eq: $id } } }) {
      id
      bowelMovement
      date
      leftBreast
      pumpTime
      rightBreast
      supplementQuantity
      supplementType
      time
      void
      vomit_spitUp
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String) {
    User(where: { email: { _eq: $email } }) {
      id
    }
  }
`;
