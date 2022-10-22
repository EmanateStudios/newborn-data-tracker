import { gql } from "@apollo/client";

export const GET_ALL_RECORDS = gql`
  query GetAllRecords($id: string) {
    Record {
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
`;
