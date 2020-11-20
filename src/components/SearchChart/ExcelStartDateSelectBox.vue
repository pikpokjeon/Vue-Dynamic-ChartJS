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
        <template v-if="clicked" v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" placeholder="" @click="dateClick">{{
            date
          }}</span>
        </template>
        <template v-else v-slot:activator="{ on, attrs }">
          <span @click="dateClick" v-bind="attrs" v-on="on">시작일</span>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
          :min="'2020-09-29'"
         
           :max="`2020-11-20`"
        > 
        <!-- :max="edate" -->
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn
            text
            color="primary"
            @click="
              $refs.menu.save(date);
              submit();
              selectedDate();
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
import moment from 'moment';
import {dateFormatType} from '../../utils/utils'
export default {
  props: ["title", "chart"],
  data: () => ({
    height: null,
    date: new Date().toISOString().slice(0, 10),
    // date: new Date().toISOString().slice(0, 10),
    edate: new Date().toISOString().slice(0, 10),
    newDate: new Date(),
    menu: false,
    modal: false,
    menu2: false,
    startDate: null,
    endDate: null,
    clicked: false,
  }),
  computed: {
    ...mapState(["searchChart"]),
  getNowDate(){
    let date = Date.now();
    console.log(dateFormatType(date))
    return dateFormatType(date)
    },
  },
  methods: {



    ...mapActions(["updateDate"]),



    dateClick() {
      this.clicked = true;
    },
    async submit() {
      console.log(this.title, "selected date:", this.date);
      this.startDate = this.date;
      await this.$emit("startDate", this.date);
      await this.updateDate({
        chart: this.chart,
        title: this.title,
        date: this.date,
      });
      await console.log(
        "Prior selected date : ",
        new Date(this.searchChart[this.chart][this.title])
      );
    },
    selectedDate() {
      let startDate = new Date(this.date);
      let endDate = new Date(this.searchChart[this.chart].endDate);
      console.log(startDate,endDate)
      if (endDate.getTime() - startDate.getTime() < 0) {
        alert("시작날과 마지막 날을 정확히 입력해 주세요");
        this.date = new Date().toISOString().slice(0, 10);
      } else {
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