import axios from "axios";


const API_URL = 
  { 
    baseUrl: "http://",
    graphql: "http://:8090/graphql",
    socket:  "ws://:9000"
  }

export default {


  API_URL,

  fetchSearchedChart : async (value) => {
    const res = await axios.post(API_URL.graphql, {
      query:
       `query {
        getTablelByDate(${ value }){
            RealTimeUser{
                statsDt
                cnt
              }
            CocurrentUser{
                statsDt
                cnt
              }
            AverageRespond{
                statsDt
                cnt
              }
            ServiceAmount{
                statsDt
                cnt
              }
        }
        }
      `
    })
    const result = res.data.data.getTablelByDate
    return result;
  },

  downloadExcelFile : async (param) => {
    const res = await axios.post(API_URL.graphql, {
      query:
      `query{
        TbStatsApiCallExcelDown(${param}){
          filePath
            fileName
         }
        }
      `
    })
    const data = res.data.data.TbStatsApiCallExcelDown

    return data
  },

  requestToRemoveFile : async(param) => {
    const res =  await axios.post(API_URL.graphql, {
      query:
      `query{
        DeleteExcelFile(${param})
      }`
    })

    return res;
  },



}
