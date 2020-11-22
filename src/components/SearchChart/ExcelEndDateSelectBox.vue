<template>
  <div class="datebox">
    <v-col cols="12" sm="3" md="12">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="edate"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
       
        <template v-if="clicked" v-slot:activator="{ on }">
          <!-- <template  v-slot:activator="{ on, attrs }"> -->
          <span @click="dateClick" v-on="on">
            {{ edate }}
          </span>
        </template> 
        <template  v-else v-slot:activator="{ on, attrs }">
          <span @click="dateClick" v-bind="attrs" v-on="on">마지막일</span>
        </template>
        <v-date-picker v-model="edate" no-title scrollable :max="maxDate">
          <!-- :max="edate" -->

          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn
            text
            color="primary"
            @click="
              $refs.menu.save(edate);
              selectedDate(submit);
              submit();
            "
          >
            OK
          </v-btn>
        </v-date-picker>
        <!-- </div> -->
      </v-menu>
    </v-col>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["title", "chart"],
  data: () => ({
    height: null,
    edate: new Date().toISOString().slice(0, 10),
    newDate: new Date().toISOString().slice(0, 10),
    // date: new Date().toISOString().slice(0,10),
    maxDate: new Date().toISOString().slice(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    startDate: null,
    endDate: null,
    clicked: false,
    isFailed: false,
  }),
  computed: {
    ...mapState(["searchChart"]),
    computedDate() {
      let compDate = this.edate;
      return compDate;
    },
    dateSwitch() {
      let val;
      if (this.isFailed) {
        val = "마지막일";
      } else {
        val = this.edate;
      }
      return val;
    },
  },
  methods: {
    ...mapActions(["updateDate"]),
    retry() {
      this.retryClickDate = true;
    },
    dateClick() {
      this.clicked = true;
    },

    submit() {
      console.log(this.title, "selected date:", this.edate);
      this.$emit("startDate", this.edate);
      this.updateDate({
        chart: this.chart,
        title: this.title,
        date: this.edate,
      });
    },
    BackToToday() {
      console.log(this.title, "selected date:", this.edate);
      this.$emit("startDate", this.edate);
      this.updateDate({
        chart: this.chart,
        title: this.title,
        date: new Date().toISOString().slice(0, 10),
      });
    },
    selectedDate(callback) {
      let endDate = new Date(this.edate);
      let startDate = new Date(this.searchChart[this.chart].startDate);
      let maxDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 6,
        10
      );

      if (maxDate.getTime() - endDate.getTime() < 0) {
        alert(`선택일 기준 6개월 이내 조회 가능합니다.
                ${maxDate
                  .toISOString()
                  .slice(0, 10)}이내 날짜를 선택해 주세요`);
        this.edate = new Date().toISOString().slice(0, 10);
        console.log(this.edate);
        this.isFailed = true;
      } else {
        console.log("good");
        this.isFailed = false;

        callback();
      }

      if (endDate.getTime() - startDate.getTime() < 0) {
        alert("시작날과 마지막날을 정확히 입력해 주세요");
        this.edate = new Date().toISOString().slice(0, 10);
        console.log("good");
        this.isFailed = true;

        this.BackToToday();
        console.log(this.edate);
      } else {
        console.log("good");
        this.isFailed = false;

        callback();
      }
    },
    mounted() {
      console.log(new Date().toISOString().slice(0, 10));
    },
  },
};
</script>
<style lang="scss" scoped>
.datebox {
  width: 110px;
  font-size: 12px;
}
.v-input {
  font-size: 13px;
}
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  display: none !important;
}
input {
  width: 80px;
}
</style>
