import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloConsumer,
} from "@apollo/client";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

//import components
import Header from "./components/Header";
import Footer from "./components/Footer";

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
