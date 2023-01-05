import { defineStore } from "pinia";

export const useMainStore = defineStore("main-store", {
  state: () => {
    return {
      typeunit: [
        {
          id: "1",
          name: "Area",
          defalutunit: "acre",
        },
        {
          id: "2",
          name: "Distance",
          defalutunit: "mile",
        },
        {
          id: "3",
          name: "Volume",
          defalutunit: "fl oz.",
        },
        {
          id: "4",
          name: "Speed",
          defalutunit: "mph",
        },
      ],
    };
  },

  getters: {
    typeunitShow(state) {
      return state.typeunit;
    },
  },

  actions: {},
});
