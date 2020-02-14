import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import client from "./graphql/client";
import RootView from "./navigation/RootView";

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <SafeAreaProvider>
      <NavigationContainer>
        <RootView />
      </NavigationContainer>
    </SafeAreaProvider>
  </ApolloProvider>
);

export default App;
