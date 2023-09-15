import { gql } from "@apollo/client";

export const SEND_MAIL = gql`
  mutation Mutation($input: sendMailInput!) {
    sendMail(input: $input) {
      _id
      to
      subject
      text
      html
    }
  }
`;

export const ALL_MAIL = gql`
  query Query {
    getAllMail {
      _id
      to
      subject
      text
      html
    }
  }
`;
