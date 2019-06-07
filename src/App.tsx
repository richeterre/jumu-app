import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ContestPickerScreen from "./screens/ContestPickerScreen";
import client from "./graphql/client";
import ContestScreen from "./screens/ContestScreen";

const StackNavigator = createStackNavigator(
  {
    ContestPicker: {
      screen: ContestPickerScreen,
      navigationOptions: {
        title: "Wettbewerbe"
      }
    },
    Contest: {
      screen: ContestScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "red",
      headerTitleStyle: { color: "black" }
    }
  }
);

const AppContainer = createAppContainer(StackNavigator);

interface Props {}

export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}
