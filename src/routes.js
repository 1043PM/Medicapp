import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

import Login from "./scenes/Login/Login.vue";
import Panel from "./scenes/Common/Common.vue";
import Home from './scenes/Home/Home.vue';
import MedicReports from "./scenes/MedicReports/MedicReports.vue";
import CreateMedicReport from "./scenes/MedicReports/scenes/CreateMedicReport";

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/panel",
    component: Panel,
    children: [
      {
        path: "home",
        component: Home
      },
      {
        path: "reports",
        component: MedicReports
      },
      {
        path: "createReport",
        component: CreateMedicReport
      }
    ]
  }
];
export default new VueRouter({
  routes: routes
});
