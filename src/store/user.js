import { Promise } from "q";
const store = {
  state: {
    user: null
  },
  getters: {
    getUser(state) {

      

      let data = [
        JSON.parse(localStorage.getItem("User")),
        JSON.parse(localStorage.getItem("Headers"))  
      ]

      return data;
    }
  },
  mutations: {
    login(state, data) {
      localStorage.setItem("User", JSON.stringify(data));
      localStorage.setItem(
        "Headers",
        JSON.stringify({
          "Access-Token": "cZ_5lhpClGl_rL7Ke4ALew",
          "Token-Type": "Bearer",
          'Client': "iP7srBZ_j7TfUWMp8pF75g",
          'Expiry': 1558644369,
          'Uid': "marcostarr1940@gmail.com"
        })
      );
    }
  },
  actions: {
    async login({ commit }, credentials) {
      let body = {
        email: credentials.email,
        password: credentials.password
      };
      let response = await fetch(
        `https://api-medicapp.herokuapp.com/auth/sign_in`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
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
      console.log("hola")
      let response = await fetch(`https://api-medicapp.herokuapp.com//doctors/8`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": "cZ_5lhpClGl_rL7Ke4ALew",
          "Token-Type": "Bearer",
          'Client': "iP7srBZ_j7TfUWMp8pF75g",
          'Expiry': 1558644369,
          'Uid': "marcostarr1940@gmail.com"
        }
      });
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
