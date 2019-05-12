<template>
  <v-navigation-drawer v-model="drawer" fixed app>
    <div class="profile">
      <div>
        <img :src="user.image">
      </div>
      <div>
        <span>{{user.email}}</span>
      </div>
    </div>

    <v-list dense>
      <v-list-tile v-for="option in options" :key="option.title" v-bind:to="option.url">
        <v-list-tile-action>
          <v-icon>{{option.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{option.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout()">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Salir</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>




<script>
import bus from "../../bus";
export default {
  data: () => ({
    drawer: false,
    options: [
      {
        title: "Registros médicos",
        icon: "assignment_ind",
        url: "/panel/reports"
      }
    ],
    user: {
      name: "Alex",
      email: "Alex@gmail.com",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"
    }
  }),
  methods: {
    logout() {}
  },
  beforeMount() {
    bus.$on("notificationDrawer", () => {
      this.drawer = !this.drawer;
    });
  },
  mounted() {
    this.user = this.$store.getters.getUser;

    this.user.image =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png";

    bus.$on("updateDrawerLogin", user => {
      console.log(user);
      this.user = user;
    });
  }
};
</script>

<style>
.profile {
  background: url("https://i.imgur.com/wt4NRqA.jpg");
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 160px;
}

.profile div {
  display: flex;
  margin: 0px 24px;
}

.profile div img {
  margin-top: 16%;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.profile div span {
  color: white;
  margin-top: 4%;
}
</style>