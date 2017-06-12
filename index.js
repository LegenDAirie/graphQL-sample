"use strict";

const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }

  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`);

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

const resolver = {
  video: () => ({
    id: "1",
    title: "bar",
    duration: 180,
    watched: true,
  }),

  videos: () => videos
};

const query = `
  query myFirstQuery {
    videos {
      id,
      title,
      duration,
      watched
    }
  }
`;

graphql(schema, query, resolver)
  .then( value => console.log(value) )
  .catch( error => console.log("error", error) );
