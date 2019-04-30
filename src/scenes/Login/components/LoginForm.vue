<template>
  <v-card flat color="grey lighten-4" height="35.7rem">
    <v-card-title class="title form">{{title}}</v-card-title>
    <v-card-text class="form">      
      {{text}}
      <v-alert color="red" v-show="Boolean(error)">{{error}}</v-alert>
      <v-form>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          :append-icon="show ? 'visibility' : 'visibility_off'"          
          :type="show ? 'text' : 'password'"
          name="password"
          label="Contraseña"   
          v-model="password"       
          @click:append="show = !show"
        ></v-text-field>
        <div class="my-2">
                 
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions class="mr-5 ml-5">
      <v-btn flat color="teal" :loading="loadingForm" @click="loginForm">Registrarse</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue lighten-1" class="white--text login" @click="login" :loading="loadingForm">Ingresar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mixinForm } from "../../../mixins";
import bus from '../../../bus';
export default {
  props: ["title", "error", "text"],
  mixins: [mixinForm],
  data() {
    return {
      show: false,      
      password: ''
    };
  },
  methods:{
      login(){
        this.loadingForm = true
        this.$store.dispatch('login',{
            email: this.email,
            password: this.password
        }).then((user) =>{
            this.loadingForm = false
        }).catch((error)=>{
            this.loadingForm = false
            this.error = error
        })
      },
      loginForm(){
            bus.$emit('loginForm')
        }
  }
};
</script>

<style>
.title {
  color: rgba(66, 165, 245, 1);
  padding-top: 20%;  
}
.form{
  padding-left: 15%;
  padding-right: 15%;
}

.login{
  
}
.signup {

}
</style>
