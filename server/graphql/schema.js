const { makeExecutableSchema } = require("@graphql-tools/schema")

const mailType = require("./types/mailType")
const mailResolver = require("./resolvers/mailResolver")

const schema = makeExecutableSchema({
  typeDefs: [mailType],
  resolvers: [mailResolver]
})

module.exports = schema