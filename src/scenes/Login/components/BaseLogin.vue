<template>
    <v-container class="mt-5">
        <v-layout wrap align-center justify-center>
            <v-flex xs12 sm6>
                <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
            </v-flex>
            <v-flex xs12 sm4>
                <slot name="form"></slot>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
   
}
</script>

<style>

</style>
