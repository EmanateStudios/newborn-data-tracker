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
