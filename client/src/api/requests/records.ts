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
        user_id
        date
        bowelMovement
      }
    }
  }
`;

export const UPDATE_RECORD = gql`
  mutation UpdateRecord($_set: Record_set_input, $id: uuid!) {
    update_Record_by_pk(pk_columns: { id: $id }, _set: $_set) {
      bowelMovement
      date
      id
      leftBreast
      pumpTime
      rightBreast
      supplementQuantity
      time
      supplementType
      user_id
      void
      vomit_spitUp
    }
  }
`;

export const DELETE_RECORD = gql`
  mutation DELETE_RECORD($id: uuid!) {
    delete_Record_by_pk(id: $id) {
      id
    }
  }
`;
