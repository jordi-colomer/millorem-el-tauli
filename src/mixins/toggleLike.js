export default {
  methods: {
    async toggleLike(user, problem) {
      console.log("click like: ", user, problem);
      if (problem.likes.find((email) => email == user)) {
        problem.likes = problem.likes.filter((element) => {
          console.log(user, element);
          console.log(user === element);
          return element !== user;
        });
      } else {
        problem.likes.push(user);
      }
      console.log("click like pre: ", user, problem);

      const response = await fetch(`../api/problems/${problem.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(problem),
      });
      const data = await response.json();

      return data;
    },
  },
};
