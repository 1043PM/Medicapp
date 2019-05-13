<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn v-show="selected.length >= 1" color="warning" v-on="on">Borrar seleccionados</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">¿Esta usted seguro que quiere borrar todos los registros seleccionados?</v-card-title>
        <v-card-text>Esta acción no podrá ser revertida.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="closeDialog()">Close</v-btn>
          <v-btn color="red darken-1" flat @click="deleteAllReports()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    selected: Array,
    deleteAll: Function
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    deleteAllReports() {
      this.closeDialog();
      //Implement web service to delete the reports selecteds.
      this.deleteAll();
    }
  }
};
</script>