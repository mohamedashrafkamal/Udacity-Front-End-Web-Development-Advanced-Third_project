import React, { Component } from "react";
import "./App.css";
import classnames from "classnames";
import { connect } from "react-redux";
import { handleSignIn } from "../actions/authedUser";
import { handleInitialData, setErrorMessage } from "../actions/shared";
import WaitingGif from "../icons/waiting.gif";
import { Redirect, withRouter } from "react-router-dom";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
    toHome: false,
  };

  toSignupForm = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(setErrorMessage(null));

    this.props.history.push("/signup");
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch(setErrorMessage(null));

    this.setState(() => ({
      loading: true,
    }));

    dispatch(handleSignIn({ id: username, password })).then((message) => {
      dispatch(handleInitialData());

      this.setState(() => ({
        loading: false,
        toHome: message === "SUCCEEDED",
      }));
    });
  };

  handleUsernameChange = (e) => {
    const username = e.target.value;

    this.setState(() => ({
      username,
    }));
  };

  handlePasswordChange = (e) => {
    const password = e.target.value;

    this.setState(() => ({
      password,
    }));
  };

  render() {
    const { username, password, loading, toHome } = this.state;
    const { common } = this.props;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="flex w-screen h-screen bg-login-image bg-no-repeat bg-cover">
        <div className="shadow-2xl flex flex-col w-1/1 sm:w-2/3 md:w-1/2 lg:w-2/5 2xl:w-1/4 bg-gradient-to-r from-cyan-200 to-light-blue-200 m-auto p-8 rounded-lg">
          <p className="m-auto text-2xl font-bold">Login</p>
          {loading ? (
            <img
              className="self-center w-15 h-15"
              src={WaitingGif}
              alt="Waiting"
            />
          ) : (
            <form className="flex flex-col" onSubmit={this.handleFormSubmit}>
              <input
                className="w-2/3 h-10 text-center self-center border-2 border-cyan-400 border-opacity-50 rounded-lg mt-12"
                placeholder="Enter your username"
                value={username}
                onChange={this.handleUsernameChange}
              />
              <input
                className="w-2/3 h-10 text-center self-center border-2 border-cyan-400 border-opacity-50 rounded-lg mt-4"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={this.handlePasswordChange}
              />

              {common && (
                <p className="shadow-lg text-center bg-red-500 p-2 font-bold font-sans text-white rounded mt-8 mx-16">
                  {common}
                </p>
              )}

              <button
                className={classnames(
                  "self-center w-2/3 font-bold rounded-full px-3 py-2 mt-12",
                  {
                    "cursor-default bg-gray-400 ring-2 ring-gray-400 ring-opacity-50":
                      username.trim() === "" ||
                      password.trim() === "" ||
                      loading,
                  },
                  {
                    "bg-white ring-2 ring-light-blue-200 text-cyan-400 hover:text-cyan-700 ring-opacity-50":
                      username.trim() !== "" &&
                      password.trim() !== "" &&
                      !loading,
                  }
                )}
                type="submit"
                disabled={
                  username.trim() === "" || password.trim() === "" || loading
                }
              >
                Login
              </button>
              <p className="self-center mt-5">
                Not a member?
                {` `}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={this.toSignupForm}
                >
                  Signup now
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => ({
  common,
});

export default withRouter(connect(mapStateToProps)(LoginForm));
