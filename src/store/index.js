import Vue from "vue";
import Vuex from "vuex";
import { QuestionModule } from "../modules/QuestionModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    question: QuestionModule
  }
});
