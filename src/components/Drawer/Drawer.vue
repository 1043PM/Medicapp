<template>
  <v-app id="inspire">
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
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>




<script>
export default {
  data: () => ({
    drawer: null,
    options: [
      {
        title: "Home",
        icon: "home",
        url: "/"
      },
      {
        title: "Registros médicos",
        icon: "assignment_ind",
        url: "/reports"
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