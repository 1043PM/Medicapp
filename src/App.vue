<template>
  <v-app>
    <!--<Drawer/>-->
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
  beforeCreate() {
    let user = this.$store.getters.getUser;

    if (user != null) {
      this.$router.push({ path: "/panel/reports" });
    } else {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
