import { gql } from "@apollo/client";

export const GET_POSITIONS = gql`
  query GetPositions {
    positions {
      name
      id
    }
  }
`;

export const DELETE_POSITION = gql`
  mutation DeletePosition($id: ID!) {
    deletePosition(id: $id) {
      affected
    }
  }
`;

export const UPDATE_POSITION = gql`
  mutation UpdatePosition($id: ID!, $position: PositionInput!) {
    updatePosition(id: $id, position: $position) {
      name
      id
    }
  }
`;

export const CREATE_POSITION = gql`
  mutation CreatePosition($position: PositionInput!) {
    createPosition(position: $position) {
      id
      name
    }
  }
`

export const GET_POSITIONS_NAMES_IDS = gql`
  query GetPositionNamesIds {
    positions {
      id
      name
    }
  }
`;
