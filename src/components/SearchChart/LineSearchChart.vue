<template>
  <div class="search-item">
    <canvas id="canvas"></canvas>

    <div class="section-title">
      <span>{{ getTitleInKor }}</span>
  <div class="excelDateBox">
      <ExcelStartDateSelectBox @startDate="getStartDate" :chart="title" :title="'startDate'"></ExcelStartDateSelectBox>
    <span>~</span>
      <ExcelEndDateSelectBox @startDate="getStartDate" :chart="title" :title="'endDate'"></ExcelEndDateSelectBox>
      <v-btn
        @click="getExcelFile(requestToRemoveFile)"
        class="submit-button"
        elevation="2"
        x-small
        rounded
        style="font-size: 11px !important"
        >export</v-btn
      >
      </div>
      </div>
    <line-chart
      :chart-data="fillData"
      :options="fillOption"
      :width="450"
      :height="250"
    ></line-chart>
  </div>
</template>

<script>
import Chart from "chart.js";
import ExcelStartDateSelectBox from "./ExcelStartDateSelectBox"
import ExcelEndDateSelectBox from "./ExcelEndDateSelectBox"
import LineChart from "./LineChart.js";
import api from "../../api/index";
import { mapState } from "vuex";
import { translateWord, translateLabel } from "../../utils/utils";
export default {
  data() {
    return {
      LoadingStatus: true,
      bgColor: null,
      lineColor: null,
      dates: null,
      today: new Date().toISOString().substr(0, 10),


    };
  },
  props: ["title", "value"],
  components: {
    LineChart,
    ExcelStartDateSelectBox,
    ExcelEndDateSelectBox,
  },
  methods: {
    getStartDate(e){
      this.dates = e ;

    },
    getEndDate(e){
      this.endDate = e ;
    },
async getExcelFile(callback) {
const { searchChart, today, title } = this;
      const param = `startDt: "${searchChart[title].startDate? searchChart[title].startDate: today}", endDt: "${searchChart[title].endDate? searchChart[title].endDate : today}", name: "${title}"`;
      console.log(param);
      const res = await api.downloadExcelFile(param);
      const downloadURL = `${api.API_URL.baseUrl}/download/${res.fileName}`;

      await window.open(downloadURL);

      setTimeout(()=>{
        callback(res.filePath, res.fileName);
      },3000)
      
    },


    async requestToRemoveFile(filePath, fileName) {
      const param = `filePath:"${filePath}", fileName:"${fileName}"`;
      await api.requestToRemoveFile(param);
    },
  },
  


  computed: {
    ...mapState(["searchChart", "searchDate"]),

    getTitleInKor() {
      return translateWord(this.title);
    },

    getTime() {
      return Array.from(this.searchChart[this.title].all).map(
        sort
      );
    },
    getValue() {
      return Array.from(this.searchChart[this.title].all).map(
        (e, i) => e.cnt
      );
    },

    fillOption() {
      const data = {
        legend: {
          display: false,
          labels: {
            display: false,
            boxWidth: 0,
          },
        },

        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: translateLabel(this.title),
              },
              gridLines: { color: "#93adc117", lineWidth: 1 },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: { color: "#93adc117", lineWidth: 1 },
            },
          ],
        },
      };

      return data;
    },

    fillData() {
      const color = Chart.helpers.color;

      const data = {
        labels: Array.from(Array(25).keys()),
        datasets: [
          {
            label: "",
            backgroundColor: this.bgColor,
            borderColor: this.lineColor,
            data: this.getValue,
            borderWidth: 1,
          },
        ],
      };
      return data;
    },
  },
  mounted() {
    const canvas = document.getElementById("canvas").getContext("2d");
    const canvasLine = document.getElementById("canvas-line").getContext("2d");
    const grad = canvas.createLinearGradient(800, 0, 600, 700);
    const gradLine = canvasLine.createLinearGradient(0, 0, 700, 700);

    grad.addColorStop(0, "rgba(18, 190, 210, 0.7)");
    grad.addColorStop(0.5, "rgba(18, 121, 210, 0.1)");
    grad.addColorStop(1, "rgba(18, 121, 210, 0)");
    gradLine.addColorStop(0, "rgba(228, 190, 238, 1)");
    gradLine.addColorStop(0.5, "rgba(18, 190, 210, 0.8)");
    gradLine.addColorStop(1, "rgba(97, 190, 255, 0)");
    this.bgColor = grad;
    this.lineColor = gradLine;
  },
};
</script>

<style lang="scss" scoped>
.search-item {
  display: flex;
  flex-wrap: wrap;
  margin: 6px;
  width: 510px !important;
  height: 330px !important;
  background: #262b3461;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 13px 31px -8px rgba(0, 0, 0, 0.75);
}
.section-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #d3dae80d;
  padding: 5px 15px 5px 30px;

  .excelDateBox{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #505867;
    height: 27px;
    border-radius: 10px;

  }
}
.submit-button {
  font-size: 13px;
}
#bar-chart {
  width: 70vh;
}
#canvas {
  display: none;
}
</style>
