<template>
  <div>
    <toolbar/>
    <Drawer/>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Toolbar from "../../components/Toolbar/Toolbar.vue";
import Drawer from "../../components/Drawer/Drawer.vue";

export default {
  components: { Toolbar, Drawer }
};
</script>