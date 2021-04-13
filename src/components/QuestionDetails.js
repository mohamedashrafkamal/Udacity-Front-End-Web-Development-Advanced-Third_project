import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Redirect } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionDetails extends Component {
  state = {
    toHome: false,
    answer: "optionOne",
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState(() => ({
      loading: true,
    }));

    const { dispatch, id } = this.props;
    const { answer } = this.state;
    dispatch(handleAnswerQuestion({ id, answer }));

    this.setState(() => ({
      loading: false,
    }));
  };

  handleChangeRadio = (e) => {
    let answer = "optionOne";

    const selectedOption = e.target.value;
    const { id, questions } = this.props;
    const { optionTwo } = questions[id];
    if (selectedOption === optionTwo.text) {
      answer = "optionTwo";
    }

    this.setState(() => ({
      answer,
    }));
  };

  handleCancelClick = () => {
    this.setState(() => ({
      toHome: true,
    }));
  };

  render() {
    const { toHome, loading } = this.state;

    const { id, users, questions, authedUser } = this.props;
    if (toHome === true) {
      return <Redirect to="/" />;
    }

    const loaded =
      Object.keys(users).length !== 0 && Object.keys(questions).length !== 0;

    if (!loaded) {
      return null;
    }

    const { author, optionOne, optionTwo } = questions[id];
    const user = users[author];

    const authedUserObject = users[authedUser.username];

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;
    const optionOneNoOfVotes = optionOne.votes.length;
    const optionTwoNoOfVotes = optionTwo.votes.length;

    const isAnswered =
      optionOne.votes.indexOf(authedUser.username) !== -1 ||
      optionTwo.votes.indexOf(authedUser.username) !== -1;

    const authedUserVote =
      optionOne.votes.indexOf(authedUser.username) !== -1 ? 1 : 2;
    return (
      <div className="relative w-1/1 sm:w-2/3 md:w-1/2 lg:w-2/5 2xl:w-1/4 bg-gradient-to-r from-cyan-200 to-light-blue-200 m-auto my-16 p-2 pt-8 rounded-lg">
        <div className="relative flex flex-col shadow-2xl bg-white p-3 m-2 mt-12 rounded-lg py-12 px-6">
          <img
            className="absolute -top-8 left-5 shadow-xl bg-white ring-2 ring-cyan-400 w-14 h-14 rounded-full p-1"
            src={user.avatarURL}
            alt="user avatar"
          />

          {isAnswered && (
            <div>
              <pre className="flex mb-4 text-2xl">
                <pre className="italic">Asked by </pre>
                <pre className="font-bold">{user.name}</pre>
              </pre>

              <p className="text-xl subpixel-antialiased font-bold text-black text-opacity-50">
                Results:
              </p>

              <div
                className={classnames(
                  "relative shadow-xl ring-2 ring-cyan-400 p-4 mt-4 rounded-lg",
                  {
                    "bg-gradient-to-r from-green-200 to-green-400 ring-green-200":
                      authedUserVote === 1,
                  }
                )}
              >
                {authedUserVote === 1 && (
                  <img
                    className="absolute top-1 right-1 shadow-xl w-6 h-6 ring-2 ring-light-blue-200 rounded-full mx-auto ml-4"
                    src={authedUser.icon}
                    alt="Username img"
                  />
                )}
                <p className="text-base subpixel-antialiased font-bold text-black text-opacity-50">
                  {`Would you rather ${optionOne.text}?`}
                </p>
                <div className="relative pt-1 mt-6">
                  <div className="absolute bottom-2 right-2 text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {`${Math.trunc(
                        (optionOneNoOfVotes / totalVotes) * 100
                      )}%`}
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-cyan-200">
                    <div
                      className={`w-${
                        optionOneNoOfVotes / totalVotes === 1
                          ? "full"
                          : `${optionOneNoOfVotes}/${totalVotes}`
                      } shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-light-blue-400`}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                className={classnames(
                  "relative shadow-xl ring-2 ring-cyan-400 p-4 mt-4 rounded-lg",
                  {
                    "bg-gradient-to-r from-green-200 to-green-400 ring-green-200":
                      authedUserVote === 2,
                  }
                )}
              >
                {authedUserVote === 2 && (
                  <img
                    className="absolute top-1 right-1 shadow-xl w-6 h-6 ring-2 ring-light-blue-200 rounded-full mx-auto ml-4"
                    src={authedUser.icon}
                    alt="Username img"
                  />
                )}
                <p className="text-base subpixel-antialiased font-bold text-black text-opacity-50">
                  {`Would you rather ${optionTwo.text}?`}
                </p>
                <div className="relative pt-1 mt-6">
                  <div className="absolute bottom-2 right-2 text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {`${Math.trunc(
                        (optionTwoNoOfVotes / totalVotes) * 100
                      )}%`}
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-cyan-200">
                    <div
                      className={`w-${
                        optionTwoNoOfVotes / totalVotes === 1
                          ? "full"
                          : `${optionTwoNoOfVotes}/${totalVotes}`
                      } shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-light-blue-400`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isAnswered && (
            <form onSubmit={this.handleSubmit}>
              <pre className="flex mb-4 text-2xl">
                <pre className="font-bold">{user.name}</pre>
                <pre className="italic"> says...</pre>
              </pre>
              <p className="text-base subpixel-antialiased font-bold text-black text-opacity-50">
                Would you rather
              </p>
              <input
                className="mt-4"
                type="radio"
                id="optionOne"
                name="gender"
                value={optionOne.text}
                defaultChecked={!isAnswered ? true : false}
                onChange={this.handleChangeRadio}
              />
              <label className="ml-2" htmlFor="optionOne">
                {optionOne.text}
              </label>
              <br />
              <input
                type="radio"
                id="optionTwo"
                name="gender"
                value={optionTwo.text}
                onChange={this.handleChangeRadio}
              />
              <label className="ml-2" htmlFor="optionTwo">
                {optionTwo.text}
              </label>
              <br />
              <button
                className={classnames(
                  "font-bold rounded-full ring-2 px-3 py-2 mt-6",
                  {
                    "cursor-default bg-gray-400 bg-opacity-75 text-black text-opacity-50":
                      authedUserObject.questions.length === 0 || loading,
                  },
                  {
                    "bg-white ring-light-blue-200 text-cyan-400 hover:text-cyan-700":
                      authedUserObject.questions.length > 0 && !loading,
                  }
                )}
                type="submit"
                disabled={authedUserObject.questions.length === 0 || loading}
              >
                Submit
              </button>
              <button
                className="font-bold rounded-full bg-white ring-2 ring-light-blue-200 text-red-400 hover:text-red-700 px-3 py-2 mt-4 ml-4"
                onClick={this.handleCancelClick}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { id } = props.match.params;
  return {
    id,
    users,
    questions,
    authedUser,
  };
};

export default connect(mapStateToProps)(QuestionDetails);
