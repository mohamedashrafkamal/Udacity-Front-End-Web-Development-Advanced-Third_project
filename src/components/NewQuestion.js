import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import classnames from "classnames";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
    loading: false,
  };

  handleCancelClick = () => {
    this.setState(() => ({
      toHome: true,
    }));
  };

  handleOptionOneChange = (e) => {
    const optionOneText = e.target.value;

    this.setState(() => ({
      optionOneText,
    }));
  };

  handleOptionTwoChange = (e) => {
    const optionTwoText = e.target.value;

    this.setState(() => ({
      optionTwoText,
    }));
  };

  handleSubmit = () => {
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;
    dispatch(
      handleAddQuestion({
        optionOneText,
        optionTwoText,
      })
    );

    this.setState(() => ({
      toHome: true,
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome, loading } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="flex flex-col w-1/1 sm:w-2/3 md:w-1/2 lg:w-2/5 2xl:w-1/4 bg-gradient-to-r from-cyan-200 to-light-blue-200 m-auto my-16 p-2 pt-8 rounded-lg">
        <p className="m-auto text-2xl font-bold">Create New Question</p>
        <div className="flex flex-col shadow-2xl bg-white p-3 m-2 mt-12 rounded-lg py-12 px-6">
          <pre className="flex mb-4 text-xl">
            <pre className="italic">Complete the question:</pre>
          </pre>
          <p className="font-bold text-gray-500 text-opacity-75">
            Would you rather ...
          </p>
          <form className="flex flex-col mt-8" onSubmit={this.handleSubmit}>
            <input
              className="h-10 text-center border-2 border-cyan-400 border-opacity-50 rounded-lg"
              placeholder="Option one"
              value={optionOneText}
              onChange={this.handleOptionOneChange}
            />
            <p className="font-bold m-auto my-4">- OR -</p>
            <input
              className="h-10 text-center border-2 border-cyan-400 border-opacity-50 rounded-lg"
              placeholder="Option two"
              value={optionTwoText}
              onChange={this.handleOptionTwoChange}
            />
            <div className="self-center">
              <button
                className={classnames(
                  "font-bold rounded-full px-3 py-2 mt-8",
                  {
                    "cursor-default bg-gray-400 ring-2 ring-gray-400 ring-opacity-50":
                      optionOneText.trim() === "" ||
                      optionTwoText.trim() === "" ||
                      optionOneText.trim() === optionTwoText.trim() ||
                      loading,
                  },
                  {
                    "bg-white ring-2 ring-light-blue-200 text-cyan-400 hover:text-cyan-700 ring-opacity-50":
                      optionOneText.trim() !== "" &&
                      optionTwoText.trim() !== "" &&
                      optionOneText.trim() !== optionTwoText.trim() &&
                      !loading,
                  }
                )}
                type="submit"
                disabled={
                  optionOneText.trim() === "" ||
                  optionTwoText.trim() === "" ||
                  optionOneText.trim() === optionTwoText.trim() ||
                  loading
                }
              >
                Submit
              </button>
              <button
                className="font-bold rounded-full bg-white ring-2 ring-light-blue-200 text-red-400 hover:text-red-700 px-3 py-2 mt-4 ml-4"
                onClick={this.handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions }) => ({
  questions,
});

export default connect(mapStateToProps)(NewQuestion);
