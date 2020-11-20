import {
    dateFormat
} from '../utils/utils'
export default {
    /**
     * 차트 검색 날짜 등록 
     */
    SET_SEARCH_DATE(state, data) {
        state.searchDate = data;

    },
    /**
     * 차트 날짜 조회 세팅 
     */
    SET_SEARCH_CHART(state, data) {
        for (const [key, value] of Object.entries(data.data)) {
            state.searchChart[key].all = value;
        }
        state.searchDate = data.date;
    },

    /**
     * 실시간 차트 내역 세팅 
     */
    SET_STREAM_CNT_CHART(state, data) {

        for (const [key, value] of Object.entries(data)) {
            const obj = {
                x: dateFormat(value.statsDt),
                y: value.cnt
            }
            state.searchChart[key].stream.push(obj)

            state.searchChart[key].statsDt = value.statsDt;
        }

    },

    /**
     *  엑셀파일 다운로드 경로 등록
     */
    SET_FILE_LOCATION(state, data) {
        for (const [key, value] of Object.entries(data)) {
            state.fileDownload[key] = value;
        }
    },

    SET_EXCEL_DATE(state, data) {
        state.searchChart[data.chart][data.title] = data.date;
        console.log('SET_EXCEL_DATE :' , state.searchChart[data.chart])

    }
}