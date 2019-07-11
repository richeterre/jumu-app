import React from "react";
import { ApolloProvider } from "react-apollo";

import client from "./graphql/client";
import RootView from "./navigation/RootView";

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <RootView />
  </ApolloProvider>
);

export default App;
