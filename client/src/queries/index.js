import { gql } from "apollo-boost";

export const GET_ALL_RECIPES = gql`
  {
    getAllRecipes {
      _id
    }
  }
`;

export const GET_CURRENT_USER = gql`
  {
    getCurrentUser {
      username
    }
  }
`;

//regular mutation query
/* mutation{
    signupUser(username:"ghi",password:"pass",email:"ghi@gmail.com"){
        token
      } */
export const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation signinUser($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;
