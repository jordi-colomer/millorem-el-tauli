<template>
  <div id="mask-add"></div>
  <Navigation></Navigation>
  <!--
    <div class="list">
      <h1>This is the MyList page</h1>
      <p>Logged: {{ logged }}</p>
      <p>User: {{ loggedUser.email }}</p>
    </div>
  -->
  <main id="content-add" class="container">
    <header>
      <img
        id="logo-add"
        src="images/icon-add-a-problem.svg"
        alt="Afegir problema"
      />
      <h1>Afegir problema</h1>
      <h2>{{ loggedUser.user }}</h2>
      <p>{{ loggedUser.type }}<br />{{ loggedUser.department }}</p>
    </header>
    <form id="add-form" @submit="onSubmit">
      <label for="title">Títol del problema</label>
      <input
        id="title"
        type="text"
        placeholder="Títol del problema"
        required
        v-model="problem.title"
      />
      <label for="description">Descripció del problema</label>
      <textarea
        id="description"
        type="text"
        rows="10"
        placeholder="Descripció del problema"
        required
        v-model="problem.description"
      />
      <label id="annex-file-label" for="annexfile" @click="addAnnexFile">
        Afegir arxiu <span>(màx. 50 Mb)</span>
      </label>
      <input type="file" id="annex-file" name="annex-file" />
      <button type="submit" id="add-problem_button">Afegir problema</button>
    </form>
  </main>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import setProblem from "../mixins/setProblem";
export default {
  name: "Add",
  data() {
    return {
      problem: {
        owner: "",
        title: "",
        description: "",
        date: "",
        likes: [],
        status: "Sense tramitar",
        i3ptOwner: "",
        annexes: [],
        comments: [],
        solutions: [],
      },
    };
  },
  components: {
    Navigation,
  },
  props: {
    users: Array,
    logged: Boolean,
    loggedUser: Object,
  },
  mixins: [setProblem],
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.problem.owner = this.loggedUser.email;
      this.problem.date = new Date();
      this.problem.description = this.problem.description.replace(
        // eslint-disable-next-line no-control-regex
        new RegExp("\r?\n", "g"),
        "<br />"
      );
      this.setProblem(this.problem).then((res) => {
        console.log(res);
        console.log(res.status);
        this.$router.push({ name: "List" });
      });
    },
    addAnnexFile() {
      document.querySelector("#annex-file").click();
    },
  },
  async created() {
    if (!this.logged) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
