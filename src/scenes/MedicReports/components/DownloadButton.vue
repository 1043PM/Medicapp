<template>
  <v-layout>
    <v-btn flat icon id="button" @click="download()">
      <v-icon>cloud_download</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  props: {
    reportId: Number,
    downloadReport: Function
  },
  data() {
    return {};
  },
  methods: {
    download() {
      this.$store
        .dispatch("getReport", this.reportId)
        .then(response => {
          let report = response.data;

          this.downloadReport(report);
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style scoped>
#button {
  margin: 0px;
}
</style>