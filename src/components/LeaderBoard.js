import React, { Component } from "react";
import { connect } from "react-redux";
import crown from "../icons/crown.png";

class LeaderBoard extends Component {
  render() {
    const { users, userIds } = this.props;
    return (
      <div className="shadow-2xl flex flex-col w-1/1 sm:w-2/3 md:w-1/2 lg:w-2/5 2xl:w-1/3 bg-gradient-to-r from-cyan-200 to-light-blue-200 m-auto p-8 rounded-lg my-16">
        <ul className="flex justify-around bg-white rounded-lg p-4">
          {userIds.slice(0, 3).map((userId, index) => (
            <li
              className="flex flex-col items-center justify-center shadow-2xl rounded-lg w-1/4 p-4"
              key={userId}
            >
              <p className="font-bold text-lg text-blue-500">{index + 1}</p>
              <div className="relative mt-6">
                {index === 0 && (
                  <img
                    className="absolute z-40 -top-5 -right-5 transform rotate-45 w-6 h-6"
                    src={crown}
                    alt="Crown"
                  />
                )}

                <img
                  className={`w-16 h-16 rounded-full mx-auto ring-2 ring-blue-200 transform scale-${
                    150 - 25 * index
                  }`}
                  src={users[userId].avatarURL}
                  alt="user avatar"
                />
              </div>

              <p
                className="font-bold text-lg truncate w-4/5 mt-8"
                title={users[userId].name}
              >
                {users[userId].name}
              </p>
              <div className="bg-cyan-100 mt-4 rounded-lg p-2">
                <p>{`Answered Q: ${
                  Object.keys(users[userId].answers).length
                }`}</p>
                <p>{`Created Q: ${users[userId].questions.length}`}</p>
                <p>{`Score: ${
                  Object.keys(users[userId].answers).length +
                  users[userId].questions.length
                }`}</p>
              </div>
            </li>
          ))}
        </ul>
        {userIds.slice(3).length > 0 && (
          <ul>
            {userIds.slice(3).map((userId, index) => (
              <li
                className="flex justify-between items-center bg-white mt-8 p-4 rounded-lg"
                key={userId}
              >
                <div className="flex items-center w-2/5">
                  <p className="truncate font-bold text-lg text-blue-500">
                    {index + 4}
                  </p>
                  <img
                    className="w-8 h-8 rounded-full ml-4"
                    src={users[userId].avatarURL}
                    alt="user avatar"
                  />
                  <p className="font-bold ml-4" title={users[userId].name}>
                    {users[userId].name}
                  </p>
                </div>
                <div className="flex justify-around w-3/5">
                  <p className="font-bold bg-cyan-100 rounded-lg p-2">{`AQ: ${
                    Object.keys(users[userId].answers).length
                  }`}</p>
                  <p className="font-bold bg-cyan-100 rounded-lg p-2">{`CQ: ${users[userId].questions.length}`}</p>
                  <p className="font-bold bg-cyan-100 rounded-lg p-2">{`Score: ${
                    Object.keys(users[userId].answers).length +
                    users[userId].questions.length
                  }`}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const userIds = Object.keys(users).sort(
    (a, b) =>
      Object.keys(users[b].answers).length +
      users[b].questions.length -
      (Object.keys(users[a].answers).length + users[a].questions.length)
  );

  return {
    users,
    userIds,
  };
};

export default connect(mapStateToProps)(LeaderBoard);
