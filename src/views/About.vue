<template>
  <div id="about" class="container">
    <img src="/images/logo-app.svg" alt="Millorem el Taulí app" />
    <h1>Millorem el Taulí<br />app</h1>
    <hr />
    <h2>Prototype for Agile<br />UX/UI Master 2020-21 | ESDi</h2>
    <p>by Gisela, Sandra &amp; Jordi.<br />May-June, 2021</p>
  </div>
</template>

<script>
export default {
  name: "About",
  props: {
    logged: Boolean,
    loggedUser: Object,
  },
};
</script>

<style scoped>
#about {
  color: white;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 60px;
}
hr {
  margin-top: 40px;
  margin-bottom: 40px;
}
h2,
p {
  font-weight: normal;
  color: white;
}
</style>
