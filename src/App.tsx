import React from "react";
import { ApolloProvider } from "react-apollo";
import { useScreens } from "react-native-screens";

import client from "./graphql/client";
import RootView from "./navigation/RootView";

// https://reactnavigation.org/docs/en/react-native-screens.html
useScreens();

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <RootView />
  </ApolloProvider>
);

export default App;
