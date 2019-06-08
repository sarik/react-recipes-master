import React from "react";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const handleSignout = (history, client) => {
  localStorage.setItem("token", "");
  client.resetStore();
  history.push("/");
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button onClick={() => handleSignout(history, client)}>Signout</button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
