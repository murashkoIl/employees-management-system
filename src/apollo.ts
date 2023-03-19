import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  deleteUserInfoFromLocalStorage,
  getUserInfoFromLocalStorage,
} from "@helpers/localStorage";
import { logoutObserver } from "./helpers/observer";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_BACKEND,
});

const authLink = setContext((_, { headers }) => {
  const { access_token } = getUserInfoFromLocalStorage();
  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === "Unauthorized") {
        deleteUserInfoFromLocalStorage();
        logoutObserver.notify();
      }
    });
  }
  if (networkError) {
    if ("statusCode" in networkError && networkError.statusCode === 401) {
      deleteUserInfoFromLocalStorage();
      logoutObserver.notify();
    }
  }
});

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({ addTypename: false }),
});
