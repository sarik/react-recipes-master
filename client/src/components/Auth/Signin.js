import React from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "./../Error";

const initialState = {
  username: "",
  password: ""
};

class Signin extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    console.log("before op");
    signinUser()
      .then(async ({ data }) => {
        console.log("after op");
        localStorage.setItem("token", data.signinUser.token);
        await this.props.refetch();
        this.clearState();
        console.log(localStorage.getItem("token"));
        this.props.history.push("/");
      })
      .catch(err => console.log(`err in catch is ${err}`));
  };

  validateForm = () => {
    const { username, password } = this.state;

    const isInvalid = !username || !password;

    return !isInvalid;
  };

  render() {
    /*  let currUser = '';
    if(this.props.data.getCurrentUser) 
    {currUser = this.props.data.getCurrentUser.username;} */

    const { username, password } = this.state;

    return (
      <div className="App">
        {/* <h2>{currUser ?`Welcome ${currUser}`: 'SIGNIN'}</h2> */}
        <h2>SIGNIN</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form className="form"
                onSubmit={event => {
                  this.handleSubmit(event, signinUser);
                }}
              >
                <input
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                />

                {error && <Error error={error} />}

                <button
                  type="submit"
                  disabled={loading || !this.validateForm()}
                >
                  Submit
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signin;
