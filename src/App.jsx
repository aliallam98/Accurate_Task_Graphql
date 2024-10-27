import "./App.css";
import {  RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import UserAuthProvider from "./context/UserAuthProvider.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { Toaster } from "sonner";

// import AuthMiddleware from "./components/AuthMiddleware.jsx";

function App() {

  const httpLink = new HttpLink({ uri: "http://192.168.1.100:8000/graphql" });

  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");

    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Toaster />
        <UserAuthProvider>
          <RouterProvider router={router} />
        </UserAuthProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
