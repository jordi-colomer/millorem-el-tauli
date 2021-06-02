export default {
  methods: {
    async getProblem(id) {
      const response = await fetch(`api/problems/${id}`);
      const data = await response.json();
      return data;
    },
  },
};
