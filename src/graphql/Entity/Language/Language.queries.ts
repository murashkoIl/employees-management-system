import { gql } from "@apollo/client";

export const GET_LANGUAGES = gql`
  query GetLanguages {
    languages {
      id
      iso2
      name
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($id: ID!) {
    deleteLanguage(id: $id) {
      affected
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($id: ID!, $language: LanguageInput!) {
    updateLanguage(id: $id, language: $language) {
      iso2
      name
      id
    }
  }
`;

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($language: LanguageInput!) {
    createLanguage(language: $language) {
      id
      iso2
      name
    }
  }
`;
