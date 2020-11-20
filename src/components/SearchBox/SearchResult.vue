<template>
  <div class="page">
    <section ref="searchTop" id="searchTop" class="date-show">
      <div class="choosen-date-box">
        <div class="left">
          <h3>통계 기간조회</h3>
          <span>{{ searchDate }}</span>
        </div>
        <div class="datebox">
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker class="datepicker" v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
          <v-btn
            class="submit-date-button"
            @click="submit()"
            elevation="2"
            small
            light
            rounded
            color="white"
            style="font-weight: 700 !important; font-size: 15px !important"
            >조회</v-btn
          >
        </div>
      </div>
    </section>

    <section class="bottom">
      <div class="center">
        <div class="container-box">
          <!-- 실시간 x 사용자 수 -->

          <LineSearchChart
            :idx="1"
            :title="'RealTimeUser'"
            :value="searchChart.RealTimeUser.all"
          >
          </LineSearchChart>

          <!-- 동시접속자수 -->

          <LineSearchChart
            :idx="2"
            :title="'CocurrentUser'"
            :value="searchChart.CocurrentUser.all"
          >
          </LineSearchChart>
        </div>
        <div class="container-box">
          <!-- 평균응답시 간 -->

          <BarSearchChart
            :idx="3"
            :title="'AverageRespond'"
            :value="searchChart.AverageRespond.all"
          >
          </BarSearchChart>

          <!-- 서비스처리량 -->

          <BarSearchChart
            :idx="4"
            :title="'ServiceAmount'"
            :value="searchChart.ServiceAmount.all"
          >
          </BarSearchChart>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LineSearchChart from "../SearchChart/LineSearchChart";
import BarSearchChart from "../SearchChart/BarSearchChart";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      height: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
    };
  },
  components: {
    LineSearchChart,
    BarSearchChart,
  },

  computed: {
    ...mapState(["searchDate", "searchChart"]),
  },
  methods: {
    ...mapActions(["fetchSearchedChart", "computeSearchDate"]),

    submit() {
      this.fetchSearchedChart(this.date);
    },
  },
  created() {
    this.fetchSearchedChart();
  },
};
</script>
<style lang='scss'>
.bottom {
  padding-top: 11px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.date-show {
  position: relative;
  background: linear-gradient(
    157deg,
    rgba(27, 58, 82, 1) 35%,
    rgba(21, 27, 37, 1) 100%
  );
}
.choosen-date-box {
  width: 1050px;
  padding: 22px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  .left {
    display: flex;
    padding: 1px 10px 1px 5px;
    align-items: center;

    h3 {
      margin-right: 100px;
    }
  }
}

.datebox {
  width: 400px;
  display: flex;
  align-items: center;
}
.submit-date-button {
  margin-left: 50px;
  background: linear-gradient(
    164deg,
    rgba(255, 242, 84, 0.36) 60%,
    rgba(14, 255, 188, 0.1) 109%
  );
}
.v-btn__content {
  font-weight: 700 !important;
}
</style>