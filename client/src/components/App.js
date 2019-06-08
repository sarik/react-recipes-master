import React from "react";
import "./App.css";
import { Query, Mutation } from "react-apollo";
import { GET_CURRENT_USER } from "../queries";

//1)ctrl+fun+f2 2)ctrl+f alt+enter3)alt+ click for different text

/* const QueryComponent = props => {
  return (
    <div>
      <h2>Home</h2>
      <Query query={GET_CURRENT_USER}>
        {({ data, loading, error }) => {
          if (loading) return <div>...Loading</div>;
          if (error) return <div>Error</div>;
          return <div>{data.getCurrentUser.username}</div>;
        }}
      </Query>
    </div>
  );
};  */

const App = () => {
  return (
    <div className="App">
      <h2>HOME</h2>
    </div>
  );
};

export default App;
