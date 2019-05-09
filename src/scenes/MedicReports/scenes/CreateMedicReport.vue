<template>
  <v-card flat color="grey lighten-4">
    <v-btn flat icon to="/panel/reports">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>
      {{text}}
      <v-alert color="red" v-show="Boolean(error)">{{error}}</v-alert>
      <v-form v-model="valid">
        <v-select :items="customers" v-model="customer" label="Cliente" :rules="rulesCustomer"></v-select>

        <v-text-field v-model="fullName" label="Nombre del paciente" :rules="rulesName"></v-text-field>

        <p>Género</p>
        <v-radio-group v-model="gender">
          <v-radio v-for="gender in genders" :key="gender" :label="gender" :value="gender"></v-radio>
        </v-radio-group>

        <p>Fecha de nacimiento</p>
        <v-date-picker v-model="birthdate" :landscape="true" :reactive="true"></v-date-picker>

        <v-layout row wrap>
          <v-flex xs9>
            <v-slider
              class="mt-5"
              v-model="height"
              :rules="rulesHeight"
              label="Altura en centímetros"
              :max="300"
              :min="0"
              step="1"
              thumb-label="always"
            ></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="height" class="mt-4 ml-3" type="number"></v-text-field>
          </v-flex>
        </v-layout>

        <v-select
          :items="BloodTypes"
          v-model="bloodType"
          label="Grupo sanguíneo"
          :rules="rulesBloodType"
        ></v-select>
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
      >Guardar reporte</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mixinForm } from "../../../mixins";
import bus from "../../../bus";
export default {
  mixins: [mixinForm],
  data() {
    return {
      title: "Nuevo reporte",
      error: "",
      text: "Ingrese los siguientes campos",
      customers: ["Cliente A", "Cliente B", "Cliente C"],
      customer: "",
      fullName: "",
      genders: ["Masculino", "Femenino"],
      gender: "Masculino",
      birthdate: new Date().toISOString().substr(0, 10),
      height: 0,
      BloodTypes: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
      bloodType: ""
    };
  },
  methods: {
    createUser() {
      let newReport = {};
      this.loadingForm = true;
      newReport.customer = this.customer;
      newReport.fullName = this.fullName;
      newReport.gender = this.gender;
      newReport.birthdate = this.birthdate;
      newReport.height = this.height;
      newReport.bloodType = this.bloodType;
      this.$store
        .dispatch("createReport", newReport)
        .then(report => {
          this.loadingForm = false;
        })
        .catch(error => {
          this.loadingForm = false;
          this.error = error;
        });
    }
  }
};
</script>

<style>
</style>