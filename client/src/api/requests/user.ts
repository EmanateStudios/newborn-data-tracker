import { gql } from "@apollo/client";

export const GET_USER_RECORDS = gql`
  query GetUserRecords($id: string) {
    User(where: { id: { _eq: $id } }) {
      Records {
        bowelMovement
        date
        id
        leftBreast
        pumpTime
        rightBreast
        supplementQuantity
        supplementType
        time
        user_id
        void
        vomit_spitUp
      }
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
