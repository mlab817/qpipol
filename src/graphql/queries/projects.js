import gql from 'graphql-tag'
import {
  BASIC_INFORMATION_FRAGMENT,
  PROJECT_FRAGMENT
} from "src/graphql/fragments";

export const PROJECTS = gql`
    query (
      $where: ProjectsWhereWhereConditions
      $orderBy: [ProjectsOrderByOrderByClause!]
      $first: Int!
      $page: Int!
    ) {
      projects(
        where: $where
        orderBy: $orderBy
        first: $first
        page: $page
      ) {
        data {
          ...basicInformation
        }
        paginatorInfo {
          currentPage
          lastPage
          perPage
          total
        }
      }
    }
    ${BASIC_INFORMATION_FRAGMENT}
`

export const SEARCH_PROJECTS = gql`
  query searchProjects(
    $search: String!
    $first: Int!
    $page: Int!
  ) {
    searchProjects(
      search: $search
      first: $first
      page: $page
    ) {
      data {
        ...basicInformation
      }
      paginatorInfo {
        currentPage
        lastPage
        perPage
        total
      }
    }
  }
  ${BASIC_INFORMATION_FRAGMENT}
`;

export const PROJECT_FIND_BY_SLUG = gql`
  query (
    $slug: String!
  ) {
    projectFindBySlug(
      slug: $slug
    ) {
      ...projectFragment
    }
  }
  ${PROJECT_FRAGMENT}
`
