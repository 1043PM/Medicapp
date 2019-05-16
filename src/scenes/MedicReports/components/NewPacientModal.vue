/* eslint-disable */
<template>
  <div class="text-xs-center">
    <v-dialog v-model="showModal" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Agregar paciente</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="pacient.name" :counter="20" label="First name" required></v-text-field>
            <v-text-field v-model="pacient.lastname" :counter="20" label="Last name" required></v-text-field>
            <v-select :items="companies" label="Company" @change="setAnswer" item-value="companies" item-text="company"  single-line></v-select>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat small color="error" @click="closeModala">Cancelar</v-btn>
          <v-btn color="primary" flat @click="sendUser">Agregar</v-btn>
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
      companies:[],
      error:{}
    };
  },
  props: ["showModal", "closeModal"],
  beforeMount(){
      this.$store
        .dispatch("getUsers")
        .then(response => {
          response.data.forEach(element => {
            if(element.role == "company"){
              this.companies.push(element);
            }
          });
        })
        .catch(error => {          
          this.error = error;
        });        
        this.companies = [
          'TEST'
        ]
  },
  methods:{
      closeModala(){
        this.closeModal()
      },
      sendUser(){      
        let user = this.$store.getters.getUser;        
        this.pacient.doctor_id = user.id;
        console.log(this.pacient)
        this.$store
        .dispatch("addPacient", this.pacient)
        .then(response => {
            this.showModal = false;
            this.pacient = {};
            this.closeModala()
        })
        .catch(error => {          
          this.error = error;
        });
      },
      setAnswer(company) {
        this.companies.forEach(element =>{
          if(element.company == company){
            this.pacient.company_id = element.id;
          }
        });
      }
  }
};
</script>

<style>
</style>
