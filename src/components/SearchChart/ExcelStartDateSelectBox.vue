<template>
  <div class="datebox">
    <v-col cols="12" sm="3" md="12">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-if="clicked" v-slot:activator="{ on,attrs}">
          <span  v-on="on" v-bind="attrs" placeholder="" @click="dateClick">
            <!-- {{isFailed ? '시작일' : date }} -->
            {{dateSwitch}}
            </span>
        </template>
        <template v-else v-slot:activator="{ on, attrs }">
          <span @click="dateClick" v-bind="attrs" v-on="on">시작일</span>
        </template>
        <v-date-picker v-model="date" no-title scrollable :max="maxDate">
          <!-- :max="edate" -->
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn
            text
            color="primary"
            @click="
              $refs.menu.save(date);
              selectedDate(submit);
              

              submit();
            "
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import { dateFormatType } from "../../utils/utils";
export default {
  props: ["title", "chart"],
  data: () => ({
    height: null,
    date: new Date().toISOString().slice(0, 10),
    // date: new Date().toISOString().slice(0, 10),
    edate: new Date().toISOString().slice(0, 10),
    maxDate: new Date().toISOString().slice(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    startDate: null,
    endDate: null,
    clicked: false,
    isFailed: false,
    retryClickDate: false,
  }),
  computed: {
    ...mapState(["searchChart"]),
     dateSwitch(){
      let val;
      if(this.isFailed){
        val = '시작일'
        
      }else{
        val = this.date
      }
      return val
    },
    getNowDate() {
      let date = Date.now();
      console.log(dateFormatType(date));
      return dateFormatType(date);
    },
  },
  methods: {
    ...mapActions(["updateDate"]),

    retry(){
      this.retryClickDate = true;
    },
    dateClick() {
      this.clicked = true;
    },
    submit() {
      console.log(this.title, "selected date:", this.date);
      this.startDate = this.date;
      this.$emit("startDate", this.date);
      this.updateDate({
        chart: this.chart,
        title: this.title,
        date: this.date,
      });
      console.log(
        "Prior selected date : ",
        new Date(this.searchChart[this.chart][this.title])
      );
    },
    selectedDate(callback) {
      let startDate = new Date(this.date);
      let endDate = new Date(this.searchChart[this.chart].endDate);
      let maxDate = new Date(endDate.getFullYear(), endDate.getMonth() - 6, 10);

      console.log(startDate, endDate);
      if (maxDate.getTime() - startDate.getTime() > 0) {
        alert(`선택일 기준 6개월 이내 조회 가능합니다.
        ${maxDate.toISOString().slice(0, 10)}이내 날짜를 선택해 주세요`);
        this.date = new Date().toISOString().slice(0, 10);
        this.isFailed = true;
        console.log(this.date);
      } else {
        console.log("good");
        this.isFailed = false;

        callback();
      }

      if (endDate.getTime() < startDate.getTime()) {
        console.log();
        alert("시작날과 마지막 날을 정확히 입력해 주세요");
        this.date = new Date().toISOString().slice(0, 10);
        this.isFailed = true;

        console.log(this.date);
      } else {
        console.log("good");
        this.isFailed = false;

        callback();
      }
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
