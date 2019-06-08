import React from "react";
import { GET_CURRENT_USER } from "../queries";
import { Query } from "react-apollo";

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error ,refetch}) => {
      if (loading) return null;
      
      return <Component session={data} refetch = {refetch}{...props} />;
    }}
  </Query>
);

export default withSession;
