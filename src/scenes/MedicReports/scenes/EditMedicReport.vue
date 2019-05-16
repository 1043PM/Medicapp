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
        <v-select
          :items="pacients"
          item-text="name"
          item-value="id"
          v-model="pacientId"
          label="Paciente"
          :rules="rulesPacient"
        ></v-select>

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
        @click="updateUser"
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
      title: "Editar reporte",
      error: "",
      text: "Ingrese los siguientes campos",
      pacients: [],
      pacientId: 0,
      genders: ["Masculino", "Femenino"],
      gender: "Masculino",
      birthdate: new Date().toISOString().substr(0, 10),
      height: 0,
      weight: 0,
      BloodTypes: ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
      bloodType: "",
      pacient_id: null,
      user: null,
      idReport: null
    };
  },
  beforeMount() {
    this.user = this.$store.getters.getUser;
    this.$store
      .dispatch("getPacients")
      .then(response => {
        let pacients = response.data;
        pacients.forEach(element => {
          let pacient = {
            id: element.id,
            name: element.name + " " + element.lastname
          };
          this.pacients.push(pacient);
        });
      })
      .catch(error => {
        this.error = error;
      });

    this.idReport = this.$route.params.id;

    this.$store
      .dispatch("getReport", this.idReport)
      .then(response => {
        console.log(response);

        let report = response.data;

        this.date = report.date;
        this.pacientId = report.pacient.id;
        this.user.name = report.created_by;
        this.gender = report.gender;
        this.birthdate = report.birthdate;
        this.height = report.height;
        this.weight = report.weight;
        this.bloodType = report.bloodtype;
      })
      .catch(error => {
        this.loadingForm = false;
        this.error = error;
      });
  },
  methods: {
    updateUser() {
      console.log(this.pacientId);

      var pacient = this.pacients.find(pacient => {
        return pacient.id === this.pacientId;
      });

      let newReport = {
        idReport: this.idReport,
        name: pacient.name,
        date: new Date().toISOString().substr(0, 10),
        created_by: this.user.name,
        gender: this.gender,
        birthdate: this.birthdate,
        height: this.height,
        weight: this.weight,
        bloodtype: this.bloodType,
        pacient_id: pacient.id
      };

      console.log(newReport);
      this.loadingForm = true;
      this.$store
        .dispatch("updateReport", newReport)
        .then(response => {
          this.loadingForm = false;
          console.log(response);

          this.$router.push("/panel/reports");
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