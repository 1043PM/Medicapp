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

        <v-text-field v-model="pacientName" label="Nombre del paciente" :rules="rulesName"></v-text-field>
        <v-btn small color="primary" class="mb-5" @click="showModal = !showModal">Agregar paciente</v-btn>     
        <new-pacient-modal :showModal="showModal"/>   
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

        <v-layout row wrap>
          <v-flex xs9>
            <v-slider
              class="mt-5"
              v-model="weight"
              :rules="rulesWeight"
              label="Peso en kilogramos"
              :max="250"
              :min="0"
              step="1"
              thumb-label="always"
            ></v-slider>
          </v-flex>
          <v-flex xs3>
            <v-text-field v-model="weight" class="mt-4 ml-3" type="number"></v-text-field>
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
import NewPacientModal from "../components/NewPacientModal.vue"
import bus from "../../../bus";
export default {
  mixins: [mixinForm],
  components: {NewPacientModal},
  data() {
    return {
      title: "Nuevo reporte",
      error: "",
      text: "Ingrese los siguientes campos",
      customers: ["Cliente A", "Cliente B", "Cliente C"],
      customer: "",
      pacientName: "",
      genders: ["Masculino", "Femenino"],
      gender: "Masculino",
      birthdate: new Date().toISOString().substr(0, 10),
      height: 0,
      weight: 0,
      BloodTypes: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
      bloodType: "",
      user: null,
      showModal: false
    };
  },
  beforeMount(){
    this.user = this.$store.getters.getUser;
  },
  methods: {
    createUser() {
      let newReport = {
        name: this.pacientName,
        date: new Date().toISOString().substr(0, 10),
        created_by: this.user.name,
        gender: this.gender,
        birthdate: this.birthdate,
        height: this.height,
        weight: this.weight,
        bloodtype: this.bloodType,
        pacient_id: "1"
      };

      console.log(newReport);

      this.loadingForm = true;
      this.$store
        .dispatch("createReport", newReport)
        .then((response) => {
          this.loadingForm = false;
          console.log(response);

          this.$router.push('/panel/reports')

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