<template>
  <div class="search-item">
    <div class="section-title">
      <span>{{ getTitleInKor }}</span>
    </div>
    <canvas id="barstreaming1"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import { translateWord } from "../../utils/utils";
import { chartColors } from "../../utils/utils";
import { mapState } from "vuex";
export default {
  props: ["title"],
  components: {},
  data() {
    return {
      datacollection: null,
      chartData: [],
    };
  },
  computed: {
    ...mapState(["searchChart"]),
    getTitleInKor() {
      const title = translateWord(this.title);
      return title;
    },
  },
  methods: {
    /**
     * 차트에 소켓데이터 넘겨주는 부분
     */
    onRefresh(chart) {
      console.log(chart)
      this.chartData = chart.config.data.datasets[0];
      this.chartData.data.push({
        x: this.searchChart[this.title].statsDt, //타임스탬프 데이터
        // x: this.searchChart[this.title].statsDt,
        y: this.searchChart[this.title].cnt,
      });
      // console.log(this.chartData.data);
      // console.log(this.searchChart[this.title].statsDt, Date.now())
      // console.log( this.chartData.data);
    },
  },
  mounted() {
    /**
     * Chart 라이브러리 함수내 helper>color함수가 존재.
     * helper>color> alpha 투명도 속성 지정
     */
    const color = Chart.helpers.color;
    const config = {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "인원수",
            backgroundColor: color(chartColors.blue)
              .alpha(0.3)
              .rgbString(),
            borderColor: "#1279d2",
            borderWidth: 1,
            borderDash: [8, 4],
            cubicInterpolationMode: 'monotone',
            fill: false,
            lineTension: 0,
            data: [],
          },
        ],
      },
      options: {
        legend: { display: false }, //상단 dataset삭제
        title: {
          display: false,
          text: "",
        },
        scales: {
          xAxes: [
            {
              type: "realtime",
              realtime: {
                duration: 20000,
                refresh: 1000,
                delay: 1000,
                onRefresh: this.onRefresh,
              },
              gridLines: { color: "#93adc117", lineWidth: 1 },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: false,
              },
              gridLines: { color: "#93adc117", lineWidth: 1 },
            },
          ],
        },
        tooltips: {
          mode: "nearest",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
      },
    };
    /**
     *  생성한 canvas ctx2를 window customelement인 차트 인스턴스에 인자로 넘긴다
     *  차트 옵션은 두번째 인자
     */
    const ctx2 = document.getElementById("barstreaming1").getContext("2d");

    window.barstreaming1 = new Chart(ctx2, config);
  },
};
</script>

<style lang="scss" scoped>
#barstreaming1 {
  max-width: 500px;
  height: 200px;
}
</style>
