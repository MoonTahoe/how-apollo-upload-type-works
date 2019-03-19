const { ApolloServer } = require("apollo-server");

const typeDefs = `
  
  type FileStats {
    filename: String!
    mimetype: String!
    filesize: Int!
  }

  type Query {
    example: Boolean
  }

  type Mutation {
    submitAFile(file: Upload!): FileStats!
  }

`;

const getFileDetails = file =>
  new Promise(async (resolves, rejects) => {
    const { filename, mimetype, createReadStream } = await file;

    let filesize = 0;
    let stream = createReadStream();

    stream.on("data", data => {
      filesize += data.length;
    });

    stream.on("end", () =>
      resolves({
        filename,
        mimetype,
        filesize
      })
    );

    stream.on("error", rejects);
  });

const resolvers = {
  Query: {
    example: () => true
  },
  Mutation: {
    submitAFile: async (_, { file }) => getFileDetails(file)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen(4000)
  .then(() => `apollo server listening on port 4000`)
  .then(console.log)
  .catch(console.error);
