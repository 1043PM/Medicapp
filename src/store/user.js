import { Promise } from "q";
const store = {
  state: {
    user: null
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    login(states, user) {
      states.user = user;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      let body = {
        email: credentials.email,
        password: credentials.password
      };
      let response = await fetch(`https://api-medicapp.herokuapp.com/auth/sign_in`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data = await response.json();
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
    createReport({ commit }, newreport) {
      return new Promise((resolve, reject) => {
        resolve();
      });
    }
  }
};
export default store;
