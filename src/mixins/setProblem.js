export default {
  methods: {
    async setProblem(problem) {
      const response = await fetch("api/problems/", {
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
