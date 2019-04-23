<template>
  <v-card flat color="blue-grey lighten-5" class>
    <v-card-title class="title">{{title}}</v-card-title>
    <v-card-text>
      Bienvenido a la pagina de Servicios Medicos Profesionales para el transporte
      {{text}}
      <v-alert color="red" v-show="Boolean(error)">{{error}}</v-alert>
      <v-form>
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field
          :append-icon="show ? 'visibility' : 'visibility_off'"          
          :type="show ? 'text' : 'password'"
          name="password"
          label="Password"   
          v-model="password"       
          @click:append="show = !show"
        ></v-text-field>
        <div class="my-2">
            <router-link class="caption" to="/" >No tiene una cuenta?</router-link>                
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions class="pa-3">
      <v-btn flat color="teal" :loading="loadingForm">Registrarse</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue lighten-1" :loading="loadingForm">Ingresar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mixinForm } from "../mixins";
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
      }
  }
};
</script>

<style>
.title {
  color: rgba(66, 165, 245, 1);
}
</style>
