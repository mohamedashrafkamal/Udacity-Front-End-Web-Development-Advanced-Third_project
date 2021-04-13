import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import LoadingBar from "react-redux-loading";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Home from "./Home";
import QuestionDetails from "./QuestionDetails";
import NewQuestion from "./NewQuestion";
import Nav from "./Nav";
import LeaderBoard from "./LeaderBoard";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    const { authedUser } = this.props;

    const loggedIn = Object.keys(authedUser).length !== 0;

    return (
      <div className="mx-auto">
        <div>
          {loggedIn && <Nav />}
          <LoadingBar />

          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route
            exact
            path="/"
            render={() => (loggedIn ? <Home /> : <LoginForm />)}
          />
          <Route
            path="/question/:id"
            render={(props) =>
              loggedIn ? <QuestionDetails {...props} /> : <LoginForm />
            }
          />
          <Route
            path="/add"
            render={() => (loggedIn ? <NewQuestion /> : <LoginForm />)}
          />
          <Route
            path="/leaderboard"
            render={() => (loggedIn ? <LeaderBoard /> : <LoginForm />)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
