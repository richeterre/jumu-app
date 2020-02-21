import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { Settings as LuxonSettings } from "luxon";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import client from "./graphql/client";
import RootView from "./navigation/RootView";

LuxonSettings.defaultLocale = "de";

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
