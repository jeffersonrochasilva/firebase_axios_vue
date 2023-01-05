import Vue from "vue";
import axios from "axios";

// axios.defaults.baseURL = "https://curso-vue-564e7-default-rtdb.firebaseio.com/";

Vue.use({
  install(Vue) {
    // Vue.prototype.$http = axios;
    Vue.prototype.$http = axios.create({
      baseURL: "https://curso-vue-564e7-default-rtdb.firebaseio.com/",
    });

    //interceptando request
    Vue.prototype.$http.interceptors.request.use((config) => {
      console.log(config.method);
      // if (config.method === "post") {
      //   config.method = "put";
      // }
      return config;
    });

    //interceptando resposta
    Vue.prototype.$http.interceptors.response.use((response) => {
      const array = [];
      for (let chave in response.data) {
        array.push({
          id: chave,
          ...response.data[chave],
        });
      }
      response.data = array;
      return response;
    });
  },
});
