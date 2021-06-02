export default {
  methods: {
    getUserDataFromEmail: (email, users, key) => {
      let data = "N/A";
      if (users.length > 0) {
        users.forEach((user) => {
          if (user.email === email) {
            data = user[key];
          }
        });
      }
      return data;
    },
  },
};
