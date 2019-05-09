<template>
  <v-navigation-drawer v-model="drawer" fixed app>
    <div class="profile">
      <div>
        <img :src="user.photo">
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
import bus from '../../bus';
export default {
  data: () => ({
    drawer: false,
    options: [
      {
        title: "Home",
        icon: "home",
        url: "/panel/home"
      },
      {
        title: "Registros médicos",
        icon: "assignment_ind",
        url: "/panel/reports"
      }
    ],
    user: {
      name: "Alex",
      email: "Alex@gmail.com",
      photo:
        "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1200x1200.jpg"
    }
  }),
  methods: {
    logout() {}
  },
  beforeMount() {
    let user = this.$store.getters.getUser

  console.log(user[0]);

    this.user.name = user[0].name;
    this.user.email = user[0].email;

    bus.$on("notificationDrawer", () => {
      this.drawer = !this.drawer;
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