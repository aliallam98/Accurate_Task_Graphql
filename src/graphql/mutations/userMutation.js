import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation UserLogin($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const SAVE_USER = gql`
  mutation SaveUser($input: UserInput!) {
    saveUser(input: $input) {
      id
      username
    }
  }
`;

