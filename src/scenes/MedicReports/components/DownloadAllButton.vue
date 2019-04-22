<template>
  <v-layout>
    <v-btn v-show="selected.length >= 1" color="info" @click="downloadAllReports()">Descargar seleccionados</v-btn>
  </v-layout>
</template>

<script>
export default {
  props: {
    selected: Array,
    downloadAll: Function
  },
  data() {
    return {};
  },
  methods: {
    downloadAllReports() {
      this.downloadAll(this.selected);
    }
  }
};
</script>