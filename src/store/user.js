import { Promise } from "q";
import axios from "axios";
const store = {
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return JSON.parse(localStorage.getItem("User"));
    },
    getHeaders(state) {
      return JSON.parse(localStorage.getItem("Headers"));
    }
  },
  mutations: {
    login(state, response) {
      localStorage.setItem("User", JSON.stringify(response.data.data));

      let headers = response.headers;

      localStorage.setItem(
        "Headers",
        JSON.stringify({
          "Access-Token": headers["access-token"],
          "Token-Type": headers["token-type"],
          Client: headers["client"],
          Expiry: headers["expiry"],
          Uid: headers["uid"]
        })
      );
    }
  },
  actions: {
    async login({ commit }, credentials) {
      let response = await axios.post(
        "https://api-medicapp.herokuapp.com/auth/sign_in",
        credentials,
        {
          "Content-Type": "application/json"
        }
      );

      let data = await response;
      return data;
    },
    logOut({ commit }) {
      return new Promise((resolve, reject) => {
        signOut()
          .then(() => {
            commit("login", null);
            resolve();
          })
          .catch(error => reject(error));
      });
    },
    async createUser({ commit }, newUser) {
      let body = {
        name: newUser.fullname,
        nickname: newUser.nickname,
        email: newUser.email,
        password: newUser.password,
        password_confirmation: newUser.password_confirmation
      };
      let response = await fetch(`https://api-medicapp.herokuapp.com/auth`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data = await response.json();
      return data;
    },
    async getReports({ commit }) {
      console.log("hola");
      let response = await fetch(
        `https://api-medicapp.herokuapp.com//doctors/8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": "cZ_5lhpClGl_rL7Ke4ALew",
            "Token-Type": "Bearer",
            Client: "iP7srBZ_j7TfUWMp8pF75g",
            Expiry: 1558644369,
            Uid: "marcostarr1940@gmail.com"
          }
        }
      );
      let data = await response.json();
      return data;
    },
    createReport({ commit }, newreport) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }
};
export default store;
