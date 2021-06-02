export default {
  methods: {
    getStatusClass: (status) => {
      let statusClass = "status0";
      switch (status) {
        case "Sense tramitar":
          statusClass = "status0";
          break;
        case "En evaluació":
          statusClass = "status1";
          break;
        case "Acceptada":
          statusClass = "status2";
          break;
        case "En curs":
          statusClass = "status3";
          break;
        case "¡Solucionat!":
          statusClass = "status4";
          break;
        default:
          break;
      }
      return statusClass;
    },
  },
};
