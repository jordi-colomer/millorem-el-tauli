export default {
  methods: {
    getLikeClass: (email, likes) => {
      let likeClass = "nope";
      if (likes.length > 0) {
        likes.forEach((like) => {
          if (email === like) {
            likeClass = "liked";
          }
        });
      }
      return likeClass;
    },
  },
};
