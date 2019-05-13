<template>
  <v-layout>
    <v-btn flat icon id="button" @click="editReport">
      <v-icon>edit</v-icon>
    </v-btn>
  </v-layout>
</template>
<script>
export default {
  props: {
    id: Number
  },
  data: () => ({}),
  methods: {
    editReport(){
      this.$router.push({ name: 'editReport', params: {id: this.id}})
    }
  }
};
</script>

<style scoped>
#button {
  margin: 0px;
}
</style>
