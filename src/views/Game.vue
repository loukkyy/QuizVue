<template>
  <div>
    <h2>Score: {{ score }}</h2>
    <transition name="component-fade" mode="out-in" key="gameOn">
      <QuestionCard v-if="!gameFinished" class="questionCard">
        <template v-slot:questionCounter>
          <h3>#{{ questionId + 1 }} / {{ questions.length }}</h3>
        </template>
        <template v-slot:question>
          <h2 v-html="currentQuestion.question" class="question" />
        </template>
        <template v-slot:answers>
          <ul class="answer-list">
            <li
              v-for="choice in questions[questionId].choices"
              :key="choice.id"
              @click="selectAnswer(choice.id)"
              v-html="choice.value"
              :class="
                isCorrectAnswer(choice.id) ? 'correctAnswer' : 'normalAnswer'
              "
            />
          </ul>
        </template>
      </QuestionCard>
      <div v-else key="gameOver">
        <p class="message">Game Finished</p>
        <button class="btn btn-big" @click="startNewGame">New Game</button>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionCard from "@/components/QuestionCard.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Game",
  components: {
    QuestionCard,
  },
  data() {
    return {
      questionId: 0,
      score: 0,
      acceptingAnswer: true,
      classCorrectAnswer: "",
    };
  },
  methods: {
    ...mapActions("question", {
      createNewGame: "createNewGame",
    }),
    selectAnswer(id) {
      if (!this.acceptingAnswer) return;
      this.acceptingAnswer = false;
      const isCorrect = id == this.currentQuestion.answer;
      if (isCorrect) {
        this.incrementScore();
      }
      console.log("clicked" + id);
      setTimeout(() => {
        this.getNextQuestion();
      }, 1000);
    },
    isCorrectAnswer(id) {
      return id === this.currentQuestion.answer && !this.acceptingAnswer;
    },
    incrementScore() {
      this.score++;
    },
    getNextQuestion() {
      this.questionId++;
      this.acceptingAnswer = true;
    },
    async startNewGame() {
      await this.createNewGame();
      this.score = 0;
      this.questionId = 0;
    },
  },
  computed: {
    ...mapGetters("question", {
      questions: "getQuestions",
    }),
    currentQuestion() {
      return this.questions[this.questionId];
    },
    gameFinished() {
      return this.questionId >= this.questions.length;
    },
  },
};
</script>
<style scoped>
.content {
  justify-content: space-around;
}
.questionCard {
  background-color: hsl(54, 47%, 51%);
  width: 80vw;
  margin: 1rem;
  border: none;
  box-shadow: 0 0 1rem 5px hsl(54, 47%, 41%);
}
.answer-list {
  margin: 2rem 0.5rem;
}
.answer-list li {
  list-style: none;
  margin: 0.5rem;
  padding: 0.8em;
  border-radius: 9999px;
  cursor: pointer;
}
.questionCard .correctAnswer {
  background-color: rgb(75, 238, 0);
}
.questionCard .normalAnswer {
  background-color: hsl(34, 78%, 91%);
}
.questionCard .normalAnswer:hover {
  background-color: hsl(34, 78%, 71%);
}
.message {
  font-size: 3rem;
  padding: 0.8em;
  margin: 2rem;
}
.question {
  margin: 1rem;
}
</style>
