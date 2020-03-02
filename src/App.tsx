import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { Settings as LuxonSettings } from "luxon";
import React from "react";
import codePush, { CodePushOptions } from "react-native-code-push";
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

const codePushOptions: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export default codePush(codePushOptions)(App);
