let users = {
  sarahedo: {
    id: "sarahedo",
    password: "sarahedo",
    name: "Sarah Edo",
    avatarURL:
      "https://www.clipartmax.com/png/middle/71-717812_girl-person-woman-people-icon-profile-woman-icon.png",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    password: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL:
      "https://img.favpng.com/6/15/21/computer-icons-png-favpng-kfQrmEgTx3jzYW3PWnJZb1cYj.jpg",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  johndoe: {
    id: "johndoe",
    password: "johndoe",
    name: "John Doe",
    avatarURL: "https://image.flaticon.com/icons/png/512/56/56963.png",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
};

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "have horrible short term memory",
    },
    optionTwo: {
      votes: [],
      text: "have horrible long term memory",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "johndoe",
    timestamp: 1468479767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "become a superhero",
    },
    optionTwo: {
      votes: ["johndoe", "sarahedo"],
      text: "become a supervillain",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "sarahedo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "be telekinetic",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "be telepathic",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "tylermcginnis",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "be a front-end developer",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "be a back-end developer",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "tylermcginnis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "find $50 yourself",
    },
    optionTwo: {
      votes: ["johndoe"],
      text: "have your best friend find $500",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "johndoe",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["johndoe"],
      text: "write JavaScript",
    },
    optionTwo: {
      votes: ["tylermcginnis"],
      text: "write Swift",
    },
  },
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ ...users });
    }, 1000);
  });
}

export function _getUser(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const user = Object.keys(users).find((userId) => userId === id);
      if (user) {
        res({ ...users[id] });
      } else {
        rej(new Error("User not found"));
      }
    }, 3000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ ...questions });
    }, 1000);
  });
}

function formatUser({ id, password, name, avatarURL }) {
  return {
    id,
    password,
    name,
    avatarURL,
    answers: {},
    questions: [],
  };
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveUser(user) {
  return new Promise((res, rej) => {
    debugger;
    // Check if there are char other than letters and numbers
    const regex_username_pass = /[^A-Za-z0-9]+/g;

    // Check if there are char other than letters, numbers and single space
    const regex_name = /[^A-Za-z0-9 ]+/g;

    setTimeout(() => {
      // 1st check username validity
      // 2nd check password validity
      // 3rd check name validity
      // 4th check username duplication

      if (regex_username_pass.test(user.id)) {
        rej(
          new Error("Letters and numbers are only allowed in username field")
        );
      } else if (regex_username_pass.test(user.password)) {
        rej(
          new Error("Letters and numbers are only allowed in password field")
        );
      } else if (regex_name.test(user.name)) {
        rej(
          new Error(
            "Letters, numbers and single space are only allowed in name field"
          )
        );
      } else if (Object.keys(users).includes(user.id)) {
        rej(new Error(`This username ${user.id} already exists`));
      }

      const formattedUser = formatUser(user);

      // Add user to the list of users
      users = {
        ...users,
        [user.id]: formattedUser,
      };

      res({ ...formattedUser });
    }, 1000);
  });
}

export function _saveQuestion(options) {
  return new Promise((res, rej) => {
    const author = options.author;
    const formattedQuestion = formatQuestion(options);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      users = {
        ...users,
        [author]: {
          ...users[author],
          questions: users[author].questions.concat([formattedQuestion.id]),
        },
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      res();
    }, 500);
  });
}
