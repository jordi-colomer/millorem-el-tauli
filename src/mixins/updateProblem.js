export default {
  methods: {
    async updateProblem(problem) {
      const response = await fetch(`../api/problems/${problem.id}`, {
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
