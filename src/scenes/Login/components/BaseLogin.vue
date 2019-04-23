<template>
  <v-card flat color="blue-grey lighten-5" class>
    <v-card-title class="title">{{title}}</v-card-title>
    <v-card-text>
      Bienvenido a la pagina de Servicios Medicos Profesionales para el transporte
      <v-alert color="red" v-show="Boolean(error)">{{error}}</v-alert>
      <v-form>    
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      </v-form>
    </v-card-text>
    <v-card-actions class="pa-3">
      <v-btn flat color="teal">Registrarse</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="blue lighten-1">Ingresar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mixinForm} from '../mixins'
export default {
  props: ["title", "error"],
  mixins:[mixinForm]
};
</script>

<style>
.title {
  color: rgba(66, 165, 245, 1);
}
</style>
