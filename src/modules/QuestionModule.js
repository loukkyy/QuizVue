import axios from "axios";

export const QuestionModule = {
  namespaced: true,
  state: {
    questions: [],
  },
  mutations: {
    loadQuestions: (state, questions) => (state.questions = questions),
  },
  actions: {
    createNewGame: async ({ commit }) =>
      axios
        .get("https://opentdb.com/api.php?amount=10&category=9")
        .then((response) => response.data)
        .then(loadedData =>
            {
                console.log(loadedData);
                const questions = loadedData.results.map( loadedQuestion => {
                    const formattedQuestion = {
                        question: loadedQuestion.question,
                        choices: []
                    };
                    const answerChoices = [...loadedQuestion.incorrect_answers];
                    const nbPossibleAnswers = answerChoices.length + 1;
                    /* Random index for correct answer */
                    formattedQuestion.answer = Math.floor(Math.random() * nbPossibleAnswers) + 1;
                    /* Insert correct answer in answer array */
                    answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestion.correct_answer);
                    answerChoices.forEach((item, index) => {
                        const choice = {
                            id: index + 1,
                            value: item
                        }
                        // formattedQuestion["choice" + (index+1)] = choice;
                        formattedQuestion.choices.push(choice);
                    })
                    return formattedQuestion;
                });
                console.log(questions);
                commit("loadQuestions", questions);
            }
        ),
  },
  getters: {
    getQuestions: (state) => state.questions,
  },
};
