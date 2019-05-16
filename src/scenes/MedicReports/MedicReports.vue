<template>
  <div>
    <v-card-title>
      <h1>Registros médicos</h1>
      <v-spacer></v-spacer>
      <v-btn fab dark color="cyan" to="/panel/createReport">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title>
      <DeleteAllButton v-bind:selected="selected" v-bind:deleteAll="deleteAllReports"/>
      <DownloadAllButton v-bind:reportsSelected="selected" v-bind:downloadAll="downloadAllReports"/>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-on:input="cleanSelected()"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="reports"
      :search="search"
      item-key="id"
      select-all
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>
          <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
        </td>
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.date }}</td>
        <td>
          <EditButton v-bind:id="props.item.id"/>
        </td>
        <td>
          <DeleteButton v-bind:id="props.item.id" v-bind:onDelete="deleteReport"/>
        </td>
        <td>
          <DownloadButton v-bind:reportId="props.item.id" v-bind:downloadReport="downloadReport"/>
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

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      :top="'top'"
    >
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
import DownloadButton from "./components/DownloadButton";

import jsPDF from "jspdf";
import "jspdf-autotable";

import JSZip from "jszip";
import saveAs from "file-saver";

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
        { text: "ID", value: "id" },
        { text: "Nombre", value: "name" },
        { text: "Fecha", value: "date" },
        { text: "Editar", sortable: false },
        { text: "Eliminar", sortable: false },
        { text: "Descargar", sortable: false }
      ],
      reports: [],
      snackbar: {
        show: false,
        color: "success",
        timeout: 2000,
        text: ""
      }
    };
  },
  beforeMount() {
    let user = this.$store.getters.getUser;

    this.$store
      .dispatch("getReports")
      .then(reports => {
        this.reports = reports.data;
      })
      .catch(error => {
        this.error = error;
      });
  },
  methods: {
    cleanSelected() {
      this.selected = [];
    },
    deleteAllReports() {
      let reportsDeletedCount = 0;

      this.selected.forEach(element => {
        this.$store
          .dispatch("deleteReport", element.id)
          .then(response => {
            reportsDeletedCount++;

            if (reportsDeletedCount === this.selected.length) {
              this.selected.forEach(selected => {
                this.reports.splice(
                  this.reports.findIndex(report => report.id === selected.id),
                  1
                );
              });
              this.snackbar.text = "Los reportes se borraron con éxito.";
              this.snackbar.show = true;
            }
          })
          .catch(error => {
            this.error = error;
          });
      });
    },
    deleteReport(idToDelete) {
      this.$store
        .dispatch("deleteReport", idToDelete)
        .then(response => {
          this.reports.splice(
            this.reports.findIndex(report => report.id === idToDelete),
            1
          );
          this.snackbar.text = "El reporte se borro con éxito.";
          this.snackbar.show = true;
        })
        .catch(error => {
          this.error = error;
        });
    },

    createReport(report) {
      let pdfColumns = [
        {
          title: "Nombre del paciente",
          description: report.name
        },
        {
          title: "Genero",
          description: report.gender
        },

        {
          title: "Fecha de nacimiento",
          description: report.birthdate
        },

        {
          title: "Altura en cm",
          description: report.height
        },

        {
          title: "Peso en kg",
          description: report.weight
        },

        {
          title: "Tipo de sangre",
          description: report.bloodtype
        },
        {
          title: "Fecha de creacion del reporte",
          description: report.date
        },
        {
          title: "Medico encargado",
          description: report.created_by
        }
      ];

      let columns = [
        { title: "Campo", dataKey: "title" },
        { title: "Resultado", dataKey: "description" }
      ];

      var doc = new jsPDF("p", "pt");

      doc.autoTable(columns, pdfColumns);

      doc.text("Reporte medico de " + report.name, 40, 30);

      return doc;
    },

    downloadReport(report) {
      let reportPDF = this.createReport(report);
      reportPDF.save("Reporte-" + report.name + ".pdf");
    },
    downloadAllReports(reports) {
      let zip = new JSZip();

      let reportPDF = null;

      for (let i = 0; i < this.selected.length; i++) {
        reportPDF = this.createReport(reports[i]);
        zip.file(
          reports[i].id + "-Reporte-" + reports[i].name + ".pdf",
          reportPDF.output()
        );
      }

      zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, "Reportes.zip");
      });
    }
  }
};
</script>