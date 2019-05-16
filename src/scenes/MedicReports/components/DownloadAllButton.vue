<template>
  <v-layout>
    <v-btn
      v-show="reportsSelected.length >= 1"
      color="info"
      @click="downloadAllReports()"
    >Descargar seleccionados</v-btn>
  </v-layout>
</template>

<script>
export default {
  props: {
    reportsSelected: Array,
    downloadAll: Function
  },
  data() {
    return {};
  },
  methods: {
    downloadAllReports() {
      let promises = [];
      let reports = [];

      this.reportsSelected.forEach((report, index) => {
        promises.push(
          this.$store
            .dispatch("getReport", report.id)
            .then(response => {
              let report = response.data;

              reports.push(report);
            })
            .catch(error => {
              this.error = error;
            })
        );
      });

      Promise.all(promises).then(() => {
        this.downloadAll(reports);
      });
    }
  }
};
</script>