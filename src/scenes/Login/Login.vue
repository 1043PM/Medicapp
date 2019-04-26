<template>
  <div>
    <base-login>
      <login-form
        slot="form"
        title="Login"
        text="Bienvenidos a la app de servicios medicos profesionales para el transporte"
      ></login-form>
    </base-login>
    <v-footer dark absolute>               
      <v-card class="flex rounded-card" flat tile >
        <v-card-text class="blue lighten-1">
            <p class="text-xs-center">¿Qué es Medicapp?</p>
        </v-card-text>
        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 — 
          <strong>&nbsp;e-sol</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import BaseLogin from "./components/BaseLogin.vue";
import LoginForm from "./components/LoginForm.vue";
export default {
  components: { BaseLogin, LoginForm }
};
</script>
<style>
.rounded-card{
  border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
</style>
