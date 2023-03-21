import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import "./i18n";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
