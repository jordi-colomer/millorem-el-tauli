<template>
  <div id="mask-problem"></div>
  <DeepNavigation></DeepNavigation>
  <main
    id="content-problem"
    class="container"
    :class="[
      getStatusClass(problem.status),
      getLikeClass(loggedUser.email, problem.likes),
    ]"
  >
    <section id="problem-main">
      <h1>{{ problem.title }}</h1>
      <p class="list_owner">
        {{ getUserDataFromEmail(problem.owner, users, "user") }}
      </p>
      <p class="list_department">
        {{ getUserDataFromEmail(problem.owner, users, "department") }}
      </p>
      <p class="list_date" v-if="problem.date">
        <span class="list_date--short">
          {{ formatDate(problem.date, "short") }}
        </span>
        <span class="list_date--long">
          {{ formatDate(problem.date, "long") }}
        </span>
      </p>
      <p
        class="list_status"
        :class="[loggedUser.type == 'personal i3pt' ? 'list_status--i3pt' : '']"
      >
        <span>{{ problem.status }}</span>
        <span v-if="loggedUser.type == 'personal i3pt'">
          {{
            problem.i3ptOwner == "" ? "pendent assignació" : problem.i3ptOwner
          }}
        </span>
      </p>
      <p class="list_description" v-html="problem.description"></p>
      <ul class="list_annexes" v-if="problem.annexes">
        <li :key="annex.id" v-for="annex in problem.annexes">
          <a :href="annex.docUrl" :alt="`descarrega ${annex.docType}`">
            {{ annex.docName }}
          </a>
        </li>
      </ul>
    </section>
    <section id="problem-solutions">
      <h1
        :class="[userSolutionVisibility ? 'close' : 'open']"
        @click="toggleSolutions()"
      >
        Solucions
        <span>({{ problem.solutions.length }})</span>
      </h1>
      <div v-show="userSolutionVisibility">
        <form
          id="add-solution-form"
          v-show="userAddSolutionVisibility"
          @submit="onSubmitSolution"
        >
          <label for="solution-description">Descripció de la solució</label>
          <textarea
            id="solution-description"
            type="text"
            rows="10"
            placeholder="Aportar solució..."
            required
            v-model="formSolutionDescription"
          />
          <button type="submit" id="add-solution_button">
            <span>Afegir solució</span>
          </button>
        </form>
        <ul>
          <li :key="solution.id" v-for="solution in problem.solutions">
            <p class="list_solution__owner">
              {{ getUserDataFromEmail(solution.owner, users, "user") }}
            </p>
            <p class="list_solution__date">
              {{ formatDate(solution.date, "short") }}
            </p>
            <p
              class="list_solution__description"
              v-html="solution.description"
            ></p>
          </li>
        </ul>
      </div>
    </section>
    <section id="problem-comments">
      <h1
        :class="[userCommentVisibility ? 'close' : 'open']"
        @click="toggleComments()"
      >
        Comentaris
        <span>({{ problem.comments.length }})</span>
      </h1>
      <div v-show="userCommentVisibility">
        <form
          id="add-comment-form"
          v-show="userAddCommentVisibility"
          @submit="onSubmitComment"
        >
          <label for="comment-description">Descripció de la Comentari</label>
          <textarea
            id="comment-description"
            type="text"
            rows="10"
            placeholder="Aportar comentari..."
            required
            v-model="formCommentDescription"
          />
          <button type="submit" id="add-comment_button">
            <span>Afegir comentari</span>
          </button>
        </form>
        <ul>
          <li :key="comment.id" v-for="comment in problem.comments">
            <p class="list_comment__owner">
              {{ getUserDataFromEmail(comment.owner, users, "user") }}
            </p>
            <p class="list_comment__date">
              {{ formatDate(comment.date, "short") }}
            </p>
            <p
              class="list_comment__description"
              v-html="comment.description"
            ></p>
          </li>
        </ul>
      </div>
    </section>
    <aside id="problem-tools">
      <ul>
        <li class="tool_like">
          <button @click="onClickLike(loggedUser.email, problem)">
            <span>Donar o treure suport al problema</span>
          </button>
        </li>
        <li class="tool_solution">
          <button @click="addSolution()">
            <span>Aportar una solució al problema</span>
          </button>
        </li>
        <li class="tool_comment">
          <button @click="addComment()">
            <span>Afegir un comentari al problema</span>
          </button>
        </li>
      </ul>
    </aside>
    <aside
      id="problem-tools-i3pt"
      v-if="loggedUser.type == 'personal i3pt'"
      :class="toggleTools ? 'open' : 'close'"
    >
      <button class="toggleToolsButton" @click="toggleTools = !toggleTools">
        i3PT
      </button>
      <form>
        <label for="problem-i3pt-owner">Responsable i3PT</label>
        <select
          id="problem-i3pt-owner"
          name="i3PT owner"
          v-model="problem.i3ptOwner"
        >
          <option :selected="problem.i3ptOwner == ''" value="">
            Sense asignar
          </option>
          <option
            :key="user.id"
            v-for="user in users"
            :value="user.email"
            :selected="problem.i3ptOwner == user.email"
            :hidden="user.type == 'investigator/a'"
          >
            {{ user.user }}
          </option>
        </select>
        <br />
        <label for="problem-i3pt-status">Problem status</label>
        <select
          id="problem-i3pt-status"
          name="problem status"
          v-model="problem.status"
        >
          <option
            :selected="problem.status == 'Sense tramitar'"
            value="Sense tramitar"
          >
            Sense tramitar
          </option>
          <option
            :selected="problem.status == 'En evaluació'"
            value="En evaluació"
          >
            En evaluació
          </option>
          <option :selected="problem.status == 'Acceptada'" value="Acceptada">
            Acceptada
          </option>
          <option :selected="problem.status == 'En curs'" value="En curs">
            En curs
          </option>
          <option
            :selected="problem.status == '¡Solucionat!'"
            value="¡Solucionat!"
          >
            ¡Solucionat!
          </option>
        </select>
        <br />
        <button type="submit" id="i3pt-change_button" @click="i3ptChange">
          <span>Canviar estat</span>
        </button>
      </form>
    </aside>
  </main>
</template>

<script>
import getUserDataFromEmail from "@/mixins/getUserDataFromEmail";
import getStatusClass from "@/mixins/getStatusClass";
import formatDate from "@/mixins/formatDate";
import getLikeClass from "@/mixins/getLikeClass";
import toggleLike from "@/mixins/toggleLike";
import setProblem from "../mixins/setProblem";
import updateProblem from "../mixins/updateProblem";
// @ is an alias to /src
import DeepNavigation from "@/components/DeepNavigation.vue";
export default {
  name: "Problem",
  data() {
    return {
      problem: {
        id: Number,
        owner: String,
        description: String,
        likes: [],
        status: String,
        i3ptOwner: String,
        annexes: [],
        comments: [],
        solutions: [],
      },
      userSolutionVisibility: false,
      userAddSolutionVisibility: false,
      formSolutionDescription: "",
      userSolution: {
        description: "",
      },
      userCommentVisibility: false,
      userAddCommentVisibility: false,
      formCommentDescription: "",
      userComment: {
        description: "",
      },
      toggleTools: false,
    };
  },
  components: {
    DeepNavigation,
  },
  mixins: [
    getUserDataFromEmail,
    getStatusClass,
    formatDate,
    getLikeClass,
    toggleLike,
    setProblem,
    updateProblem,
  ],
  props: {
    users: Array,
    logged: Boolean,
    loggedUser: Object,
    problemId: Number,
  },
  methods: {
    async fetchProblem() {
      const response = await fetch(`../api/problems/${this.problemId}`);
      console.log(response);
      const data = await response.json();
      console.log(data);
      console.log(data.solutions);
      console.log(data.solutions.length);
      return data;
    },
    async onClickLike(email, problem) {
      await this.toggleLike(email, problem);
    },
    onSubmitSolution(event) {
      event.preventDefault();
      this.userSolution.id = this.problem.solutions.length + 1;
      this.userSolution.owner = this.loggedUser.email;
      this.userSolution.date = new Date();
      this.userSolution.description = this.formSolutionDescription.replace(
        // eslint-disable-next-line no-control-regex
        new RegExp("\r?\n", "g"),
        "<br />"
      );
      this.problem.solutions.push(this.userSolution);
      this.updateProblem(this.problem).then((res) => {
        this.problem = res;
        this.userAddSolutionVisibility = false;
      });
    },
    toggleSolutions() {
      this.userAddSolutionVisibility = false;
      this.userSolutionVisibility = !this.userSolutionVisibility;
    },
    addSolution() {
      let element = document.getElementById("problem-solutions");

      this.formSolutionDescription = "";
      this.userSolutionVisibility = true;
      this.userAddSolutionVisibility = true;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    onSubmitComment(event) {
      event.preventDefault();
      this.userComment.id = this.problem.comments.length + 1;
      this.userComment.owner = this.loggedUser.email;
      this.userComment.date = new Date();
      this.userComment.description = this.formCommentDescription.replace(
        // eslint-disable-next-line no-control-regex
        new RegExp("\r?\n", "g"),
        "<br />"
      );
      this.problem.comments.push(this.userComment);
      this.updateProblem(this.problem).then((res) => {
        this.problem = res;
        this.userAddCommentVisibility = false;
      });
    },
    toggleComments() {
      this.userAddCommentVisibility = false;
      this.userCommentVisibility = !this.userCommentVisibility;
    },
    addComment() {
      let element = document.getElementById("problem-comments");

      this.formCommentDescription = "";
      this.userCommentVisibility = true;
      this.userAddCommentVisibility = true;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    i3ptChange(event) {
      event.preventDefault();
      this.updateProblem(this.problem).then((res) => {
        this.problem = res;
        setTimeout(() => {
          this.toggleTools = false;
        }, 200);
      });
    },
  },
  async created() {
    if (this.logged) {
      this.problem = await this.fetchProblem();
    } else {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
