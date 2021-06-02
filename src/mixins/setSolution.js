export default {
  methods: {
    async setSolution(problemId, solution) {
      const response = await fetch(`../api/problems/${problemId}/solutions/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(solution),
      });

      if (response.status !== 200 && response.status !== 201) {
        alert("Error adding solution");
      }
      const data = await response.json();
      return data;
    },
  },
};
