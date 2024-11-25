import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// data
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

// resolvers
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
        },
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id);
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id);
        }
    },
    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id);
        },
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id);
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id !== args.id);
            return db.games;
        },
        addGame(_, args) {
            const newGame = {
                id: String(db.games.length + 1),
                title: args.game.title,
                platform: args.game.platform
            };
            db.games.push(newGame);
            return db.games;
        },
        updateGame(_, args) {
            const game = db.games.find((game) => game.id === args.id);
            if (!game) {
                throw new Error("Game not found");
            }
            const updatedGame = {
                ...game,
                ...args.edits
            };
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return updatedGame;
                }
                return game;
            });
            return updatedGame;
        }
    }
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
