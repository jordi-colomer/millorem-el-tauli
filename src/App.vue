<template>
  <router-view
    :users="users"
    :loggedUser="loggedUser"
    :logged="logged"
    @do-logged="doLogged"
    @do-logged-user="doLoggedUser"
  />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      users: [],
      logged: false,
      loggedUser: {},
    };
  },
  methods: {
    doLogged(state) {
      this.logged = state;
    },
    doLoggedUser(user) {
      this.loggedUser = user;
    },
    async fetchUsers() {
      const url =
        process.env.NODE_ENV === "development"
          ? "api/users"
          : "https://millorem-el-tauli-be.herokuapp.com/api/users";
      const response = await fetch(url);

      const data = await response.json();

      return data;
    },
  },
  async created() {
    this.users = await this.fetchUsers();
  },
};
</script>

<style lang="less">
/*
npm run build ---> build for production (all content to deploy is in /dist folder)

npm install --save-dev serve ---> isntall serve for local dev
npm install serve ---> install serve
npm run serve
localhost:8080 ---> dev server
serve -s dist
localhost:5000 ---> prod server
----
json-serve (https://www.npmjs.com/package/json-server)
npm install -g json-server ---> install JSON server
create db.json file
json-server --watch db.json ---> start JSON server
(created script = npm run backend)
-----
GIT
git init --> to initialize
git add . --> to add all existing files to the project (commit to stagining)
git status --> to check
git commit -m "message" --> to add all files to local git repository
-
Create a GitHub repo --> commit local git repository to remote git repository
git remote add origin https://github.com/jordi-colomer/millorem-el-tauli.git
git branch -M main
git push -u origin main

*/
</style>
