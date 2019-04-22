<template>
  <div>
    <h1>Registros médicos</h1>

    <v-card-title>
      <DeleteAllButton v-bind:selected="selected" v-bind:deleteAll="deleteAllReports"/>
      <DownloadAllButton v-bind:selected="selected" v-bind:downloadAll="downloadAllReports"/>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details v-on:input="cleanSelected()"></v-text-field>
    </v-card-title>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="reports"
      :search="search"
      item-key="folio"
      select-all
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>{{ props.item.folio }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.date }}</td>
        <td>
          <EditButton v-bind:folio="props.item.folio"/>
        </td>
        <td>
          <DeleteButton v-bind:folio="props.item.folio" v-bind:onDelete="deleteReport"/>
        </td>
        <td>
          <DownloadButton v-bind:report="props.item" v-bind:downloadReport="downloadReport"/>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Tu búsqueda para "{{ search }}" no tiene resultados.</v-alert>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" :top="'top'">
      {{ snackbar.text }}
      <v-btn flat @click="snackbar.show = false">Ok</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import DeleteAllButton from "./components/DeleteAllButton";
import DownloadAllButton from "./components/DownloadAllButton";
import EditButton from "./components/EditButton";
import DeleteButton from "./components/DeleteButton";
import DownloadButton from './components/DownloadButton';

export default {
  components: {
    DeleteAllButton,
    DownloadAllButton,
    EditButton,
    DeleteButton,
    DownloadButton
  },
  data() {
    return {
      search: "",
      selected: [],
      headers: [
        { text: "Folio", value: "folio" },
        { text: "Nombre", value: "name" },
        { text: "Fecha", value: "date" },
        { text: "Editar", sortable: false },
        { text: "Eliminar", sortable: false },
        { text: "Descargar", sortable: false }
      ],
      reports: [
        {
          folio: "0001",
          name: "Alejandro",
          date: "10/03/19"
        },
        {
          folio: "0002",
          name: "Alejandro2",
          date: "12/03/19"
        },
        {
          folio: "0003",
          name: "Alejandro3",
          date: "13/03/19"
        }
      ],
      snackbar: {
        show: false,
        color: "success",
        timeout: 2000,
        text: ""
      }
    };
  },
  methods: {
    cleanSelected(){ this.selected = []; },
    deleteAllReports() {
      this.selected.forEach(selected => {
        this.reports.splice(this.reports.findIndex(report => report.folio === selected.folio), 1);
      });
      this.snackbar.text = "Los reportes se borraron con éxito."
      this.snackbar.show = true;
    },
    deleteReport(folioToDelete) {
      this.reports.splice(this.reports.findIndex(report => report.folio === folioToDelete), 1);
      this.snackbar.text = "El reporte se borro con éxito."
      this.snackbar.show = true;
    },
    downloadReport(report){
      //TODO: How to generate a report and download it.
    },
    downloadAllReports(reports){
      //TODO: How to generate all reports, maybe compress on a .zip and download it.
      console.log(reports);
    }
  }
};
</script>