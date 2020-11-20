// import axios from "axios";
import api from "../api/index";

export default {
  // fetchStreamingChart() {},
  computeSearchDate({ commit }, e) {
    commit("SET_SEARCH_DATE", e);
  },

  async fetchSearchedChart({ commit }, date) {
    /**
     * 초기 화면 로드시 or 날짜 값이 빈 값이라면 => 현재 날짜로 검색한 결과 보여주기
     */
    const setDate = date ? date : new Date().toISOString().substr(0, 10);
    const param = `date: "${setDate}"`;
    commit("SET_SEARCH_DATE", setDate);

    const res = await api.fetchSearchedChart(param);

    const data = {
      date: setDate,
      dateParam: setDate,
      data: res,
    };
    await commit("SET_SEARCH_CHART", data);
  },

  fetchStreamingCharts({ commit }) {
    const ws = new WebSocket(api.API_URL.socket);
    ws.onopen = (e) => {
    };

    ws.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      commit("SET_STREAM_CNT_CHART", parsedData);
    };
    ws.on
  },

  updateDate({commit},date) {
    console.log('updateDate', date);
    commit("SET_EXCEL_DATE", date);
  }

 

};
