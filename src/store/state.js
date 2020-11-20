export default {
    searchDate: "",
    testChart: [],

    // statsDt, cnt에 실시간 차트데이터 저장
    // all에 날짜조회 데이터 저장
    searchChart: {
        RealTimeUser: {
            startDate: '',
            endDate: '',
        
            all: [],
            stream:[],
            statsDt: '',
            cnt: '',
            //실시간유저
        },
        CocurrentUser: {
            startDate: '',
            endDate: '',
            all: [],
            stream:[],

            statsDt: '',
            cnt: '',
        }, //동시접속유저
        AverageRespond: {
            startDate: '',
            endDate: '',
            all: [],
            stream:[],

            statsDt: '',
            cnt: '',
        }, //평균응답속도
        ServiceAmount: {
            startDate: '',
            endDate: '',
            
            all: [],
            stream:[],

            statsDt: '',
            cnt: '',
        }, //서비스처리량
    },
    fileDownload: {
        filePath:'',
        fileName:'',
    },
    streamChart: {
        RealTimeUser: {
            statsDt: [],
            cnt: [],
        },
        CocurrentUser: {
            
            statsDt: [],
            cnt: [],
        }, 
        AverageRespond: {
           
            statsDt: [],
            cnt: [],
        }, 
        ServiceAmount: {
          
            statsDt: [],
            cnt: [],
        }, 
    },
};

/**
 * nginex
 *
 */