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
import { Route, Redirect, withRouter } from "react-router-dom";

class App extends Component {
  render() {
    const { authedUser } = this.props;

    return (
      <div className="mx-auto">
        <div>
          {Object.keys(authedUser).length !== 0 && <Nav />}
          <LoadingBar />

          {Object.keys(authedUser).length === 0 ? (
            <Redirect to="/login" />
          ) : null}
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignupForm} />
          <Route exact path="/" component={Home} />
          <Route path="/question/:id" component={QuestionDetails} />
          <Route path="/new" component={NewQuestion} />
          <Route path="/leaderboard" component={LeaderBoard} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default withRouter(connect(mapStateToProps)(App));
