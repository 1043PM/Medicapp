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
    },
    logOut(state) {
      localStorage.clear();
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
    async logOut({ commit }) {
      let headersAux = this.getters.getHeaders;

      let headers = {
        "access-token": headersAux["Access-Token"],
        "token-type": headersAux["Token-Type"],
        client: headersAux["Client"],
        uid: headersAux["Uid"]
      };
      /*
      console.log(headers);
      
      let response = await axios.delete(
        "https://api-medicapp.herokuapp.com/auth/sign_out",
        headers
      );

      let data = await response;
      /*/
      return 5;
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
      let headers = this.getters.getHeaders;

      let response = await axios.get(
        "https://api-medicapp.herokuapp.com/reports",
        headers
      );

      let data = await response;
      return data;
    },
    async getReport({ commit }, idReport) {
      let headers = this.getters.getHeaders;

      let response = await axios.get(
        "https://api-medicapp.herokuapp.com/reports/" + idReport,
        headers
      );

      let data = await response;
      return data;
    },
    async createReport({ commit }, newReport) {
      let headers = this.getters.getHeaders;

      headers["Content-type"] = "application/json";

      let response = await axios.post(
        "https://api-medicapp.herokuapp.com/reports",
        newReport,
        headers
      );

      let data = await response;
      return data;
    },
    async updateReport({ commit }, newReport) {
      let headers = this.getters.getHeaders;

      headers["Content-type"] = "application/json";

      let response = await axios.put(
        "https://api-medicapp.herokuapp.com/reports/" + newReport.idReport,
        newReport,
        headers
      );

      let data = await response;
      return data;
    },
    async deleteReport({ commit }, idReport) {
      let headers = this.getters.getHeaders;

      headers["Content-type"] = "application/json";

      let response = await axios.delete(
        "https://api-medicapp.herokuapp.com/reports/" + idReport,
        headers
      );

      let data = await response;
      return data;
    },
    async getUsers({ commit }) {
      let headers = this.getters.getHeaders;

      let response = await axios.get(
        "https://api-medicapp.herokuapp.com/users",
        headers
      );

      let data = await response;
      return data;
    },
    async addPacient({ commit }, newPacient) {
      //let headers = this.getters.getHeaders;
      let response = await axios.post(
        "https://api-medicapp.herokuapp.com/pacients"  ,
        newPacient      
      );

      let data = await response;
      return data;
    }
  }
};
export default store;
