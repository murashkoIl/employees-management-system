import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      tech_stack {
        id
        name
      }
    }
  }
`;

export const GET_PROJECT_INFO = gql`
  query GetProjectInfo($id: ID!) {
    project(id: $id) {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      tech_stack {
        id
        name
      }
      team_size
    }
  }
`;

export const GET_PROJECT_NAME = gql`
  query GetProjectName($id: ID!) {
    project(id: $id) {
      name
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      affected
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $project: ProjectInput!) {
    updateProject(id: $id, project: $project) {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
        name
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
        name
      }
    }
  }
`;
