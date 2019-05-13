<template>
  <v-app>
    <!--<Drawer/>-->
    <router-view/>
  </v-app>
</template>

<script>
import bus from "./bus";
export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
  },
  mounted() {
    let user = this.$store.getters.getUser;

    if (user != null) {
      this.$router.push({ path: "/panel/reports" });

      let payload = {
        user: user
      };
      bus.$emit("updateDrawerLogin", payload);
    } else {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
