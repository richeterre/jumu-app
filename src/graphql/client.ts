import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_KEY, API_URI } from "react-native-dotenv";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: API_URI,
    headers: { "X-Api-Key": API_KEY },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
