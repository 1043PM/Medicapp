<template>
  <div class="text-xs-center">
    <v-dialog v-model="showModal" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Agregar paciente</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="pacient.name" :counter="20" label="First name" required></v-text-field>
            <v-text-field v-model="pacient.lastname" :counter="20" label="Last name" required></v-text-field>
            <v-select :items="companies" label="Company"></v-select>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat small color="error" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" flat @click="dialog = false">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pacient: {
        name: "",
        lastname: "",
        company_id: "",
        doctor_id: ""
      },
      companies:[]
    };
  },
  props: ["showModal"],
  beforeMount(){
      
  }
};
</script>

<style>
</style>
