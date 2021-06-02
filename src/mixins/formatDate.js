export default {
  methods: {
    formatDate: (date, type) => {
      const options = {
        timeZone: "Europe/Paris",
        year: type === "long" ? "numeric" : "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      };
      if (type === "long") {
        options.weekday = "long";
      }
      return new Intl.DateTimeFormat("ca-ES", options).format(new Date(date));
    },
  },
};
