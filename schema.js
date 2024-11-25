export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    game(id: ID!): Game
    review(id: ID!): Review
    reviews: [Review]
    authors: [Author]
  }
  type Mutation {
    addGame(game: GameInput): [Game]
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditGameInput!): Game
  }
  input GameInput {
    title: String!
    platform: [String!]!
  }
  input EditGameInput {
    title: String
    platform: [String!]
  }
`;
