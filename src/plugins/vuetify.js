import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      /*light: {
        background: "",
        primary: colors.yellow.darken3, // '#DDBD37', // gold
        secondary: colors.grey.darken4, // '#373c3f', // black/grey
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },

      dark: {
        background: "#1e1e1e",
        primary: "#F2A01D",
        secondary: "#5EC39F",
        accent: "#BE5A29",
        error: "#5EC39F",
        success: "#1DF26B",
      },*/
    },
  },
});
