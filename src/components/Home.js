import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import Question from "./Question";

class Home extends Component {
  state = {
    active: "U",
  };

  handleButtonChange = (value) => {
    this.setState(() => ({
      active: value,
    }));
  };

  render() {
    const { questionsIds, questions, authedUser } = this.props;
    const { active } = this.state;
    const filteredIds = questionsIds.filter(
      (questionId) =>
        ((questions[questionId].optionOne.votes.indexOf(authedUser.username) !==
          -1 ||
          questions[questionId].optionTwo.votes.indexOf(
            authedUser.username
          )) !== -1 &&
          active === "A") ||
        (questions[questionId].optionOne.votes.indexOf(authedUser.username) ===
          -1 &&
          questions[questionId].optionTwo.votes.indexOf(authedUser.username) ===
            -1 &&
          active === "U")
    );
    return (
      <div className="relative w-1/1 sm:w-2/3 md:w-1/2 lg:w-2/5 2xl:w-1/4 bg-gradient-to-r from-cyan-200 to-light-blue-200 m-auto my-16 p-2 pt-8 rounded-lg">
        <div className="absolute -top-8 left-5 right-5 shadow-xl">
          <button
            onClick={() => this.handleButtonChange("U")}
            className={classnames(
              "w-1/2 h-14 bg-white rounded-tl-lg rounded-bl-lg",
              { "font-bold text-cyan-600 bg-cyan-400": active === "U" }
            )}
          >
            Unanswered
          </button>
          <button
            onClick={() => this.handleButtonChange("A")}
            className={classnames(
              "w-1/2 h-14 bg-white rounded-tr-lg rounded-br-lg",
              { "font-bold text-cyan-600 bg-cyan-400": active === "A" }
            )}
          >
            Answered
          </button>
        </div>
        <div>
          <ul>
            {filteredIds.map((id) => (
              <li key={id}>
                <Question active={active} id={id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser }) => ({
  questionsIds:
    Object.keys(questions).length === 0
      ? []
      : Object.keys(questions).sort(
          (a, b) => questions[b].timestamp - questions[a].timestamp
        ),
  authedUser,
  questions,
});

export default connect(mapStateToProps)(Home);
