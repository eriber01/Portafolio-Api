import { createYoga, createSchema } from "graphql-yoga";
import path from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { AppDataSource } from "./config/typeorm";
import { config } from "./config/config";


// import graphqlUploadExpress from 'graphql-upload/GraphQLUpload.mjs';
const { graphqlUploadExpress } = require('graphql-upload-ts');


// const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

const resolverMap = loadFilesSync(
  path.join(__dirname, "./resolvers/**/resolvers.ts")
);

const typeDefs = loadFilesSync(
  path.join(__dirname, "./resolvers/**/schema.graphql")
);
const resolvers = mergeResolvers(resolverMap);

const schema = makeExecutableSchema({
  typeDefs,
  // resolvers,
  resolvers: resolvers,
});

async function main() {
  const app = express();
  console.log(config);
  app.get('/hola', (req, res) => {
    res.json({saludo: 'hola mudno'})
  })
  await AppDataSource.initialize();

  const port = config.port;

  const yoga = createYoga({
    schema: schema,

    multipart: true,
    context: async ({ params, request }) => {
      return {
        request,
        params,
      };
    },
  });

  app.use("/graphql",graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 30 }), yoga.requestListener, express.json());

  app.listen(port, () => {
    console.log("Se ejecuta bien! en el puerto:", port);
  });
}

main();
