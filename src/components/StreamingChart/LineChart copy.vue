<template>
  <div class="search-item">
    <canvas id="canvas"></canvas>
    <canvas id="canvas-line"></canvas>

    <div class="section-title">
      <span>{{ getTitleInKor }}</span>
    </div>
    <line-base
      :chart-data="fillData"
      :options="fillOption"
      :width="450"
      :height="250"
    ></line-base>
  </div>
</template>

<script>
import Chart from "chart.js";
import LineBase from "./LineBase.js";
import api from "../../api/index";
import { mapState } from "vuex";
import { translateWord, translateLabel } from "../../utils/utils";
import _ from "lodash";
export default {
  data() {
    return {
      LoadingStatus: true,
      bgColor: null,
      lineColor: null,
      fileName: "",
      filePath: "",
    };
  },
  props: ["title", "value"],
  components: {
    LineBase,
  },
  methods: {
    async getExcelFile(callback) {
      const { searchDate, title } = this;
      const param = `date: "${searchDate}", name: "${title}"`;
      const res = await api.downloadExcelFile(param);
      this.fileName = res.fileName;
      this.filePath = res.filePath;
      const downloadURL = `${api.API_URL.baseUrl}/download/${this.fileName}`;
      await window.open(downloadURL);
      await callback();
    },
    requestToRemoveFile() {
      const param = `filePath:"${this.filePath}", fileName:"${this.fileName}"`;
      api.requestToRemoveFile(param);
    },
  },

  computed: _.extend(
    {
       getTitleInKor() {
      const title = translateWord(this.title);
      return title;
    },

    getTime() {

      const sortedArray = Array.from(this.searchChart[this.title].stream).map( 
        e => e.x
        // sort
      );

      return sortedArray;
    },
    getValue() {

      // //유사 배열 객체를 배열로 만들어 준 후 Map사용
       let sortedArray = Array.from(this.searchChart[this.title].stream).map((e) => e.y );
        if(this.searchChart[this.title].stream.length >= 100 ){ 
          this.searchChart[this.title].stream.shift();
        }

      return sortedArray;
    },
    getData() {
      const data = this.searchChart[this.title].stream.map((e) => ({
        x: e.x,
        y: e.y
      }));
      return data;
    },
    fillOption() {
      const data = {
        legend: {
          display: false,
          labels: {
            display:false,
            boxWidth: 0,
          },
        }, //상단 dataset삭제
        bezierCurve: false,
        scales: {
          yAxes: [
            {
              scaleLabel : {
                display:true,
                labelString: translateLabel(this.title),
           
              },
              gridLines: { color: "#93adc117", lineWidth: 1 },
              ticks: {
                beginAtZero:true
              }
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "#93adc117",
                lineWidth: 1,
                offsetGridLines: true,
              },
              ticks: {

                autoskip:true,
                maxTicksLimit : 20,
             
              },
            },
          ],
        },
      };

      return data;
    },

    fillData() {
      const color = Chart.helpers.color;
      const data = {
        labels: this.getTime,
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
   mapState(["searchChart", "searchDate"])
  ),






  mounted() {
    const canvas = document.getElementById("canvas").getContext("2d");
    const canvasLine = document.getElementById("canvas-line").getContext("2d");
    const grad = canvas.createLinearGradient(800, 0, 600, 400);
    const gradLine = canvasLine.createLinearGradient(0, 500, 500, 500);

    grad.addColorStop(0, "rgba(18, 190, 210, 0.7)");
    grad.addColorStop(1, "rgba(18, 121, 210, 0)");
    gradLine.addColorStop(0, "rgba(228, 190, 238, 1)");
    gradLine.addColorStop(0.5, "rgba(18, 190, 210, 1)");
    gradLine.addColorStop(1, "rgba(97, 190, 255, 1)");
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
}
.submit-button {
  font-size: 13px;
}
#bar-chart {
  width: 70vh;
}
#canvas,
#canvas-line {
  display: none;
}
</style>
