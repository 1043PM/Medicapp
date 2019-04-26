<template>
<v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click="notificationDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
</template>
<script>
import bus from '../../bus';
export default {
    methods:{
        notificationDrawer(){
            bus.$emit('notificationDrawer')
        }
    }
};
</script>
    
<style>
</style>
    