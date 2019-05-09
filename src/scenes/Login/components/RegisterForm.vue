<template>
  <v-card flat color="grey lighten-4" height="35.7rem">
    <v-card-title class="title form">{{title}}</v-card-title>
    <v-card-text class="form">
      {{text}}
      <v-alert color="red" v-show="Boolean(error)">{{error}}</v-alert>
      <v-form v-model="valid" class="form">
        <v-text-field v-model="fullname" label="Nombre completo" :rules="rulesName"></v-text-field>
        <v-text-field v-model="nickname" label="Nickname" ></v-text-field>
        <v-text-field v-model="email" label="Email" :rules="emailRules"></v-text-field>
        <v-text-field v-model="password" label="contraseña" :rules="passwordRules" type="password"></v-text-field>
        <v-text-field
          v-model="passwordRep"
          label="repita su contraseña"
          :rules="repitPasswordRules"
          type="password"
        ></v-text-field>
        <router-link to="/" @click.native="loginForm">Ya tiene una cuenta?</router-link>
      </v-form>
    </v-card-text>
    <v-card-actions class="mr-5 ml-5">
      <v-spacer></v-spacer>
      <v-btn
        @click="createUser"
        :loading="loadingForm"
        :disabled="!valid"
        color="primary"
        block
      >Registrarse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mixinForm } from "../../../mixins";
import bus from "../../../bus";
export default {
  props: ["title", "error", "text"],
  mixins: [mixinForm],
  data() {
    return {
      fullname: "",
      passwordRep: "",
      nickname: ""
    };
  },
  methods: {
    createUser() {      
      this.loadingForm = true;      

      this.$store.dispatch('createUser', {
        'fullname' : this.fullname,
        'password' : this.password,
        'email' : this.email,
        'password_confirmation' : this.passwordRep,
        'nickname' : this.nickname,
      }).then((user) => {
          this.loadingForm = false;      
          console.log(user);          
          this.loginForm();                        
        })
        .catch(error => {
          this.loadingForm = false;
          this.error = error;
        });
    },
    loginForm() {
        bus.$emit("loginForm");
      }
  }
};
</script>

<style>
.title {
  color: rgba(66, 165, 245, 1);
  padding-top: 20%;
}
.form {
  padding-left: 15%;
  padding-right: 15%;
}
</style>
