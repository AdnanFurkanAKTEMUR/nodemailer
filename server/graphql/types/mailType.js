const { gql } = require("apollo-server");

module.exports = gql`
  type Mail {
    _id: String
    to: String
    subject: String
    text: String
    html: String
  }

  input sendMailInput {
    to: String
    subject: String
    text: String
    html: String
  }

  type Query {
    getAllMail: [Mail]
  }
  type Mutation {
    sendMail(input: sendMailInput!): Mail
  }
`;
