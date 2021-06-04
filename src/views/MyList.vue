<template>
  <Navigation></Navigation>
  <!--
  <div class="list">
    <h1>This is the MyList page</h1>
    <p>Logged: {{ logged }}</p>
    <p>User: {{ loggedUser.email }}</p>
  </div>
  -->
  <aside id="mylist__user">
    <h1>{{ loggedUser.user }}</h1>
    <p>{{ loggedUser.type }}<br />{{ loggedUser.department }}</p>
    <p>{{ loggedUser.email }}</p>
  </aside>
  <main
    id="content-mylist"
    class="container"
    :class="[problems.length == 0 ? 'empty' : '']"
  >
    <ul id="problems-list">
      <li
        class="problem-in-list"
        :key="problem.id"
        v-for="problem in problems"
        :class="getStatusClass(problem.status)"
      >
        <h1 @click="viewProblem(problem.id)">{{ problem.title }}</h1>
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
        <p class="mylist_tools">
          <button class="mylist_preview--button"><span>Preview</span></button>
          <button class="mylist_edit--button"><span>Edit</span></button>
        </p>
      </li>
    </ul>
    <div
      class="no-problems"
      v-if="problems.length == 0 && loggedUser.type != 'personal i3pt'"
    >
      <p>No has creat cap problema encara.</p>
      <p>
        Vols
        <router-link id="add" to="/add">afegir</router-link>
        un nou problema?
      </p>
    </div>
    <div
      class="no-problems"
      v-if="problems.length == 0 && loggedUser.type == 'personal i3pt'"
    >
      <p>No tens assignat cap problema encara.</p>
    </div>
  </main>
</template>

<script>
import getUserDataFromEmail from "../mixins/getUserDataFromEmail";
import getStatusClass from "@/mixins/getStatusClass";
import formatDate from "@/mixins/formatDate";
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
  mixins: [getUserDataFromEmail, getStatusClass, formatDate],
  props: {
    users: Array,
    logged: Boolean,
    loggedUser: Object,
  },
  methods: {
    async fetchProblems() {
      const url =
        process.env.NODE_ENV === "development"
          ? "api/problems"
          : "https://millorem-el-tauli-be.herokuapp.com/api/problems";
      const response = await fetch(url);
      const data = await response.json();
      const myProblems = data.filter((problem) => {
        if (this.loggedUser.type == "personal i3pt") {
          return problem.i3ptOwner === this.loggedUser.email;
        } else {
          return problem.owner === this.loggedUser.email;
        }
      });

      return myProblems;
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
