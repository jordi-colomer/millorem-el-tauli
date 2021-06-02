<template>
  <Navigation></Navigation>
  <!--
  <div class="list">
    <h1>This is the List page</h1>
    <p>Logged: {{ logged }}</p>
    <p>User: {{ loggedUser.email }}</p>
  </div>
  -->
  <main
    id="content-list"
    class="container"
    :class="[problems.length == 0 ? 'empty' : '']"
  >
    <ul id="problems-list">
      <li
        class="problem-in-list"
        :key="problem.id"
        v-for="problem in problems"
        :class="[
          getStatusClass(problem.status),
          getLikeClass(loggedUser.email, problem.likes),
        ]"
      >
        <h1 @click="viewProblem(problem.id)">{{ problem.title }}</h1>
        <h2>{{ getUserDataFromEmail(problem.owner, users, "user") }}</h2>
        <p class="list_department">
          {{ getUserDataFromEmail(problem.owner, users, "department") }}
        </p>
        <p class="list_description" v-html="problem.description"></p>
        <p class="list_annexes" v-if="problem.annexes.length > 0">
          {{ problem.annexes.length }}
        </p>
        <p class="list_data">
          <span class="list_data--short">
            {{ formatDate(problem.date, "short") }}
          </span>
          <span class="list_data--long">
            {{ formatDate(problem.date, "long") }}
          </span>
        </p>
        <p class="list_status">
          <span>{{ problem.status }}</span>
        </p>
        <ul class="list_counters">
          <li class="list_likes">
            <span class="counter">{{ problem.likes.length }}</span>
            <span>Suports</span>
          </li>
          <li class="list_comments">
            <span class="counter">{{ problem.comments.length }}</span>
            <span>Comentaris</span>
          </li>
          <li class="list_solutions">
            <span class="counter">{{ problem.solutions.length }}</span>
            <span>Solucions</span>
          </li>
        </ul>
        <button
          class="list_like--button"
          @click="onClickLike(loggedUser.email, problem)"
        >
          <span>like</span>
        </button>
      </li>
    </ul>
  </main>
</template>

<script>
import getUserDataFromEmail from "../mixins/getUserDataFromEmail";
import getStatusClass from "../mixins/getStatusClass";
import formatDate from "../mixins/formatDate";
import getLikeClass from "../mixins/getLikeClass";
import toggleLike from "../mixins/toggleLike";
// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
export default {
  name: "List",
  data() {
    return {
      problems: [],
    };
  },
  components: {
    Navigation,
  },
  mixins: [
    getUserDataFromEmail,
    getStatusClass,
    formatDate,
    getLikeClass,
    toggleLike,
  ],
  props: {
    users: Array,
    logged: Boolean,
    loggedUser: Object,
  },
  methods: {
    async fetchProblems() {
      const response = await fetch("api/problems");
      const data = await response.json();
      return data;
    },
    onClickLike(email, problem) {
      this.toggleLike(email, problem);
    },
    viewProblem(id) {
      this.$router.push({
        name: "Problem",
        params: { problemId: id },
      });
    },
  },
  async created() {
    if (this.logged) {
      this.problems = await this.fetchProblems();
    } else {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
