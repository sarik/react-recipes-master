import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import withSession from "./components/withSession";
import Navbar from "./components/Navbar";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    console.log("in operation");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError, graphQLErrors }) => {
    if (networkError) {
      console.log(`Network error: ${networkError}`);
      if (networkError.statusCode === 401) {
        console.log(networkError.statusCode);
        localStorage.setItem("token", "");
      }
    }
  }
});

const Root = ({ session, ...props }) => (
  //if(props.data.getCurrentUser)

  <Router>
    <Navbar session={session} />
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signup" component={Signup} />
      <Route
        path="/signin"
        render={signinProps => (
          <Signin {...signinProps} refetch={props.refetch} />
        )}
      />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
