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

    let user = this.$store.getters.getUser

    this.$store.commit('login', user[0])
    this.$router.push('/panel')

  }
};
</script>
