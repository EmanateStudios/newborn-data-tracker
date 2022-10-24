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

export const INSERT_RECORD = gql`
  mutation InsertRecord($objects: [Record_insert_input!]!) {
    insert_Record(objects: $objects) {
      returning {
        vomit_spitUp
        void
        time
        supplementType
        supplementQuantity
        rightBreast
        pumpTime
        leftBreast
        id
        date
        bowelMovement
      }
    }
  }
`;
