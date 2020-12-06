import gql from 'graphql-tag'
import {
  BASIC_INFORMATION_FRAGMENT,
  PROJECT_FRAGMENT
} from "src/graphql/fragments";

export const PROJECTS = gql`
    query ($orderBy: [ProjectsOrderByOrderByClause!], $first: Int!, $page: Int!) {
      projects(orderBy: $orderBy, first: $first, page: $page) {
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
