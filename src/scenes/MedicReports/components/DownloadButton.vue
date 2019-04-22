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
    report: null,
    downloadReport: Function
  },
  data() {
    return {};
  },
  methods: {
    download() {
      this.downloadReport(this.report);
    }
  }
};
</script>

<style scoped>
#button {
  margin: 0px;
}
</style>