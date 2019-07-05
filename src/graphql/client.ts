import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://jumubase-staging.herokuapp.com/graphql"
});

export default client;
