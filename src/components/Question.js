import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Question extends Component {
  handleButtonClick = (value) => {};

  render() {
    const { id, users, questions } = this.props;
    const { author, optionOne, optionTwo } = questions[id];
    const user = users[author];

    return (
      <div className="relative flex flex-col shadow-2xl bg-white p-3 m-2 mt-12 rounded-lg py-12 px-6">
        <img
          className="absolute -top-8 left-5 shadow-xl bg-white ring-2 ring-cyan-400 w-14 h-14 rounded-full p-1"
          src={user.avatarURL}
          alt="user avatar"
        />
        <pre className="flex mb-4 text-2xl">
          <pre className="font-bold">{user.name}</pre>
          <pre className="italic"> says...</pre>
        </pre>
        <p className="text-base subpixel-antialiased font-bold text-black text-opacity-50">
          Would you rather
        </p>
        <p className="text-xl tracking-wider w-1/5 truncate mt-2">{`${optionOne.text} ${optionTwo.text}`}</p>
        <Link
          to={`/question/${id}`}
          className="absolute -top-10 right-5 font-bold rounded-full bg-white text-cyan-400 hover:text-cyan-700 ring-2 ring-light-blue-300 p-3 mt-4"
        >
          {" "}
          View Poll &rarr;{" "}
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, users }) => ({
  users,
  questions,
});

export default connect(mapStateToProps)(Question);
