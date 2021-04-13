import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions/authedUser";

class Nav extends Component {
  handleSignOut = (e) => {
    e.preventDefault();

    const { dispatch, history } = this.props;
    dispatch(signOut());
    history.push("/login");
  };

  render() {
    const { authedUser } = this.props;
    return (
      <nav className="shadow-lg py-4">
        <div className="mx-auto w-2/5 flex flex-col lg:flex-row justify-between">
          <ul className="flex flex-col lg:flex-row justify-between">
            <li className="p-2">
              <NavLink
                to="/"
                exact
                activeClassName="pb-2 border-b-4 border-yellow-400"
              >
                Home
              </NavLink>
            </li>
            <li className="ml-2 2xl:ml-8 p-2">
              <NavLink
                to="/add"
                activeClassName="pb-2 border-b-4 border-yellow-400"
              >
                New Question
              </NavLink>
            </li>
            <li className="ml-2 2xl:ml-8 p-2">
              <NavLink
                to="/leaderboard"
                activeClassName="pb-2 border-b-4 border-yellow-400"
              >
                Leader Board
              </NavLink>
            </li>
          </ul>
          <div className="flex flex-col lg:flex-row items-center">
            <p className="text-xl">
              {Object.keys(authedUser).length !== 0
                ? authedUser.username
                : "Username"}
            </p>
            <img
              className="w-8 h-8 rounded-full mx-auto ml-4"
              src={authedUser.icon}
              alt="Username img"
            />
            <button
              className="ml-4 py-1 px-3 font-bold text-white bg-red-600 rounded-full ring-2 ring-red-300"
              onClick={this.handleSignOut}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default withRouter(connect(mapStateToProps)(Nav));
