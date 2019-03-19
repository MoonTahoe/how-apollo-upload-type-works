import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createUploadLink } from "apollo-upload-client";
import App from "./components/App";

const link = createUploadLink({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
