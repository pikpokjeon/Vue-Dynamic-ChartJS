<template>
  <section class="top">
    <div class="center">
      <div class="container-box">
        <LineChart :idx="1" :title="'AverageRespond'"></LineChart>
        <LineChart :idx="4" :title="'ServiceAmount'"></LineChart>
      
      </div>
      <div class="container-box">
        <LineChart :idx="2" :title="'RealTimeUser'"></LineChart>
        <LineChart :idx="3" :title="'CocurrentUser'"></LineChart>

      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
import LineChart from "./StreamingChart/LineChart";
export default {
  components: {
    LineChart,
  },
  computed: {
    ...mapState(["searchChart"]),
  },
  methods: {
    ...mapActions(["fetchStreamingCharts"]),
  },
  mounted() {
    this.fetchStreamingCharts();
  },
};
</script>
<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 900px;
}
</style>
