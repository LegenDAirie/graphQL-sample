"use strict";

const express = require("express");
const graphqlHTTP = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = require("graphql");

const PORT = process.env.PORT || 3001;
const server = express();

const videoType = new GraphQLObjectType({
  name: "Video",
  description: "A video",
  fields: {
    id: {
      type: GraphQLID,
      description: "id"
    },
    title: {
      type: GraphQLString,
      description: "title"
    },
    duration: {
      type: GraphQLInt,
      description: "Time"
    },
    watched: {
      type: GraphQLBoolean,
      description: "watched?"
    },
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false,
        });
      }),
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType
});


const video1 = {
  id: "5",
  title: "stuff & things",
  duration: 345,
  watched: false,
};

const video2 = {
  id: "9",
  title: "food & stuff",
  duration: 45,
  watched: true,
};

const videos = [video1, video2];


server.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
