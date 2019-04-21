<template>
  <v-app>
    <Drawer/>
  </v-app>
</template>

<script>
import Drawer from "./components/Drawer/Drawer";

export default {
  name: "App",
  components: {
    Drawer
  },
  data() {
    return {
      //
    };
  }
};
</script>
