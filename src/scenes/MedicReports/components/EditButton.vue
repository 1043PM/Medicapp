<template>
  <v-layout>
    <v-btn flat icon id="button">
      <v-icon>edit</v-icon>
    </v-btn>
  </v-layout>
</template>
<script>
export default {
  props: {
    id: Number
  },
  data: () => ({})
};
</script>

<style scoped>
#button {
  margin: 0px;
}
</style>
