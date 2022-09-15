import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_KEY, API_URI } from "@env";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: API_URI,
    headers: { "X-Api-Key": API_KEY, "Content-Type": "application/json" },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export default client;
