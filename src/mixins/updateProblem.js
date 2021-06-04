export default {
  methods: {
    async updateProblem(problem) {
      const url =
        process.env.NODE_ENV === "development"
          ? `../api/problems/${problem.id}`
          : `https://millorem-el-tauli-be.herokuapp.com/api/problems/${problem.id}`;
      const response = await fetch(url, {
        method: "PUT",
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
