import React, { Component } from "react";
import "./App.css";
import classnames from "classnames";
import { connect } from "react-redux";
import { handleSignUp } from "../actions/authedUser";
import { handleInitialData, setErrorMessage } from "../actions/shared";
import WaitingGif from "../icons/waiting.gif";
import { Redirect, withRouter } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";

class SignupForm extends Component {
  state = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    loading: false,
    toHome: false,
    edit: false,
    avatarURL:
      "https://w7.pngwing.com/pngs/686/219/png-transparent-youtube-user-computer-icons-information-youtube-hand-silhouette-avatar-thumbnail.png",
  };

  toLoginForm = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(setErrorMessage(null));

    this.props.history.push("/login");
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const {
      fullName,
      username,
      password,
      confirmPassword,
      avatarURL,
    } = this.state;

    dispatch(setErrorMessage(null));

    this.setState(() => ({
      loading: true,
      edit: false,
    }));

    if (password !== confirmPassword) {
      setTimeout(() => {
        dispatch(setErrorMessage("Password mismatch"));

        this.setState(() => ({
          loading: false,
        }));
      }, 2000);
    } else {
      dispatch(
        handleSignUp({ name: fullName, id: username, password, avatarURL })
      ).then((message) => {
        dispatch(handleInitialData());

        this.setState(() => ({
          loading: false,
          toHome: message === "SUCCEEDED",
        }));
      });
    }
  };

  handleFullNameChange = (e) => {
    const fullName = e.target.value;

    this.setState(() => ({
      fullName,
    }));
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

  handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;

    this.setState(() => ({
      confirmPassword,
    }));
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState((state) => ({
      edit: !state.edit,
    }));
  };

  handleAvatarURLChange = (e) => {
    const avatarURL = e.target.value;

    if (avatarURL.trim() !== "") {
      this.setState(() => ({
        avatarURL,
      }));
    }
  };

  render() {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      loading,
      toHome,
      edit,
      avatarURL,
    } = this.state;
    const { common } = this.props;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="flex w-screen h-screen bg-login-image bg-no-repeat bg-cover">
        <div className="shadow-2xl flex flex-col w-1/1 sm:w-2/3 md:w-1/2 lg:w-2/5 2xl:w-1/4 bg-gradient-to-r from-cyan-200 to-light-blue-200 m-auto p-8 rounded-lg">
          <p className="m-auto text-2xl font-bold">Sign Up</p>
          {edit && (
            <input
              className="w-full h-10 text-center self-center border-2 border-cyan-400 border-opacity-50 rounded-lg mt-12"
              value={avatarURL}
              onChange={this.handleAvatarURLChange}
            />
          )}
          {loading ? (
            <img
              className="self-center w-15 h-15"
              src={WaitingGif}
              alt="Waiting"
            />
          ) : (
            <form className="flex flex-col" onSubmit={this.handleFormSubmit}>
              <div className="relative self-center">
                <button
                  className={classnames(
                    "absolute top-6 -right-1 text-2xl rounded-lg",
                    { "text-cyan-200 bg-blue-700": edit },
                    { "text-blue-700 bg-cyan-200": !edit }
                  )}
                  onClick={this.handleEdit}
                >
                  <BiEditAlt />
                </button>
                <img
                  className="w-24 h-24 rounded-full ring-2 ring-blue-400 mt-8"
                  src={avatarURL}
                  alt="user avatar"
                />
              </div>

              <input
                className="w-2/3 h-10 text-center self-center border-2 border-cyan-400 border-opacity-50 rounded-lg mt-12"
                placeholder="Enter your full name"
                value={fullName}
                onChange={this.handleFullNameChange}
              />
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

              <input
                className="w-2/3 h-10 text-center self-center border-2 border-cyan-400 border-opacity-50 rounded-lg mt-4"
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onChange={this.handleConfirmPasswordChange}
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
                      fullName.trim() === "" ||
                      username.trim() === "" ||
                      password.trim() === "" ||
                      confirmPassword.trim() === "" ||
                      loading,
                  },
                  {
                    "bg-white ring-2 ring-light-blue-200 text-cyan-400 hover:text-cyan-700 ring-opacity-50":
                      fullName.trim() !== "" &&
                      username.trim() !== "" &&
                      password.trim() !== "" &&
                      confirmPassword.trim() !== "" &&
                      !loading,
                  }
                )}
                type="submit"
                disabled={
                  fullName.trim() === "" ||
                  username.trim() === "" ||
                  password.trim() === "" ||
                  confirmPassword.trim() === "" ||
                  loading
                }
              >
                Signup
              </button>
              <p className="self-center mt-5">
                Already a member?
                {` `}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={this.toLoginForm}
                >
                  Login now
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

export default withRouter(connect(mapStateToProps)(SignupForm));
