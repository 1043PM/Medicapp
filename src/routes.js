import VueRouter from "vue-router";
import Vue from 'vue';

Vue.use(VueRouter);

import Home from "./scenes/Home/Home.vue";
import MedicReports from "./scenes/MedicReports/MedicReports.vue";
import Login from "./scenes/Login/Login.vue";

const routes = [
  {
    path:'/',    
    component: Login     
  },
  { 
    path: "/home",      
    component: Home
  },
  { 
    path: "/reports",     
    component: MedicReports 
  }
]
export default new VueRouter({
  routes:routes
})
