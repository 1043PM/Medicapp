import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

import MedicReports from "./scenes/MedicReports/MedicReports.vue";
import Login from "./scenes/Login/Login.vue";
import Panel from "./scenes/Common/Common.vue";

const routes = [
  {
    path: "/",
    component: Login
  },
  {
    path: "/reports",
    component: MedicReports
  },
  {
    path: "/panel",
    component: Panel,
    children: [
      {
        path: "reports/:id",
        component: MedicReports
      }
    ]
  }
];
export default new VueRouter({
  routes: routes
});
