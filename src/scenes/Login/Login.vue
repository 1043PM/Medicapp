<template>
    <div>
        <base-login  > 
            <login-form slot="form" title = "Login"  text = "Bienvenidos a la app de servicios medicos profesionales para el transporte" ></login-form>
        </base-login>
    </div>
</template>

<script>
import BaseLogin from './components/BaseLogin.vue'
import LoginForm from './components/LoginForm.vue'
export default {
components:{BaseLogin, LoginForm}
}
</script>

<style>

</style>
