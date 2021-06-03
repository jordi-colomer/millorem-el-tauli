<template>
  <header id="header--login" class="container">
    <div id="logo-app">
      <img src="/images/logo-app.svg" alt="Millorem el Taulí app" />
    </div>
    <h1>Millorem el Taulí</h1>
    <img
      id="logo-tauli"
      src="images/logo_tauli_blanc.svg"
      alt="Parc Taulí - Hospital Universitari"
    />
  </header>
  <main class="container">
    <form id="login-form" @submit="onSubmit">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email de usuari"
        required
        v-model="email"
        @focus="isError = false"
      />
      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Contrasenya"
        required
        v-model="password"
        @focus="isError = false"
      />
      <div class="error-message" v-show="isError">
        Nom d'usuari o contrasenya incorrectes.<br />Torneu-ho a provar.
      </div>
      <button type="submit" id="login">Login</button>
    </form>
  </main>
</template>

<script>
export default {
  name: "Login",
  props: {
    users: Array,
  },
  data() {
    return {
      email: "",
      password: "",
      isError: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      document.getElementById("email").blur();
      document.getElementById("password").blur();
      if (this.email !== "" && this.password !== "") {
        this.users.forEach((user) => {
          if (user.email === this.email && user.password === this.password) {
            this.isError = false;
            console.log(`Yess!!!it is ${user.email}!`);
            this.$emit("do-logged-user", user);
            this.$emit("do-logged", true);
            this.$router.push({ name: "List" });
          } else {
            this.isError = true;
          }
        });
      } else {
        console.log("empty data in form");
      }
    },
  },
};
</script>
