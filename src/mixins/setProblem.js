export default {
  methods: {
    async setProblem(problem) {
      const url =
        process.env.NODE_ENV === "development"
          ? "api/problems/"
          : "https://millorem-el-tauli-be.herokuapp.com/api/problems/";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(problem),
      });

      if (response.status !== 200 && response.status !== 201) {
        alert("Error adding problem");
      }
      const data = await response.json();
      return data;
    },
  },
};
