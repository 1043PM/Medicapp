<template>
  <v-app>
    <!--<Drawer/>-->
    <router-view/>
  </v-app>
</template>

<script>


export default {    
  name: 'App',
  components:{},
  data() {
    return {
      //
    };
  },
  beforeCreate(){   

    this.$store.commit('login', user)
    this.$router.push('/panel')

  }
};
</script>
