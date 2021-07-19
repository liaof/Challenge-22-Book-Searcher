const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input BookData {
      authors: [String]
      description: String
      bookId: String
      title: String!
      image: String
      link: String
  }
  type User{
      _id: ID
      username: String
      email: String
      bookCount: Int
      savedBooks: [Book]
  }
  type Book {
      bookId: String
      authors: [String]
      description: String
      title: String
      image: String
      link: String
  }
  type Query {
    me: User
    helloWorld: String
  }
  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(email: String!, username: String!, password: String!): Auth
      saveBook(input: BookData): Book
      removeBook(bookId: String!): User
  }
  type Auth {
      token: ID!
      user: User
  }
`;


module.exports = typeDefs;