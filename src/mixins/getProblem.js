export default {
  methods: {
    async getProblem(id) {
      const url =
        process.env.NODE_ENV === "development"
          ? `api/problems/${id}`
          : `https://millorem-el-tauli-be.herokuapp.com/api/problems/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
  },
};
