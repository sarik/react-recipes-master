import React from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import Error from "./../Error";
import { withRouter } from "react-router";

/* const Ba = (props) => {
  console.log(props);
    return <h2>BB</h2>;
  };

const Aaa = ({a,...rest}) => {
  
  return <h2>aa<Ba {...rest}/></h2>;
};

const Aa = withRouter(Aaa); */
const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
};

class Signup extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser()
      .then(({ data }) => {
        this.clearState();
        localStorage.setItem("token", data.signupUser.token);
      })
      .catch(err => console.log(`err in catch is ${err}`));
  };

  validateForm = () => {
    const { username, password, email, confirmPassword } = this.state;

    const isInvalid =
      !username || !email || !password || password !== confirmPassword;

    return !isInvalid;
  };

  render() {
    const { username, password, email, confirmPassword } = this.state;
    return (
      <div className="App">
        {/*<Aa a="aa" b="bb" />*/}
        <h2>Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, password, email, confirmPassword }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={event => {
                  this.handleSubmit(event, signupUser);
                }}
              >
                <input
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={this.handleChange}
                  value={confirmPassword}
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

export default Signup;
