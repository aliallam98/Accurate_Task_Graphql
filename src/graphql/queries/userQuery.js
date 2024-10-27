import { gql } from "@apollo/client";

export const USERS = gql`
  query Users {
    listUsers {
      paginatorInfo {
        total
      }
      data {
        id
        username
      }
    }
  }
`;

export const USER = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      username
      active
      roles {
        id
        name
      }
    }
  }
`;
export const Roles = gql`
  query roles {
    listRolesDropdown {
      id
      name
      code
    }
  }
`;
export const ACCOUNTS = gql`
  query Accounts {
    listCustomersDropdown {
      id
      name
    }
  }
`;
export const ACCOUNTS_FOR_DELIVERY = gql`
  query Accounts {
    listDeliveryAgentsDropdown {
      id
      name
    }
  }
`;
