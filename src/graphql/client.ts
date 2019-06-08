import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://jumubase-staging-pr-13.herokuapp.com/graphql"
});

export default client;
