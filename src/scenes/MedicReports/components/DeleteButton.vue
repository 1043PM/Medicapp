<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn flat icon id="button" v-on="on">
          <v-icon>delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="headline"
        >¿Esta usted seguro que quiere borrar este registro con folio {{folio}}?</v-card-title>
        <v-card-text>Esta acción no podrá ser revertida.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="closeDialog()">Close</v-btn>
          <v-btn color="red darken-1" flat @click="deleteRegister(folio)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    folio: String,
    onDelete: Function
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
    deleteRegister(folio) {
      this.closeDialog();
      //Implement web service to delete a register
      this.onDelete(folio);
    }
  }
};
</script>

<style scoped>
#button {
  margin: 0px;
}
</style>