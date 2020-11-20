
const titles = {
    RealTimeUser: "시간당 방문자 수",
    CocurrentUser: "동시 사용자 수",
    AverageRespond: "평균 응답 시간",
    ServiceAmount: "서비스 처리량",
}
const label = {
  RealTimeUser: "인원(명)",
  CocurrentUser: "인원(명)",
  AverageRespond: "시간(ms)",
  ServiceAmount: "처리량(개)",
}
export const translateWord = (word) => {
    let translatedWord;
    for (const key in titles) {
      if (word === key) {
        translatedWord = titles[key];
      }
    }
    return translatedWord;
}

export const translateLabel = (word) => {
  let translatedWord;
  for (const key in label) {
    if (word === key) {
      translatedWord = label[key];
    }
  }
  return translatedWord;
}

/**
 * map 함수로서 중복된 integar 값이 연이어 나올 경우 첫번째 값만 보여줌 (차트용)
 * @param {*} e 배열의 현재 원소
 * @param {*} i 배열의 현재 인덱스
 * @param {*} z 배열을 이전원소
 * 
 */          
export const remainOnlyFirstVal = (e, i, z) =>  i != 0 ? ( z[Math.max(0, i-1)].statsDt == e.statsDt ? "" : e.statsDt) : e.statsDt;

export  const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};


export const dateFormat = (dateNum) => {
  let date = new Date(dateNum);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hour = ("0" + date.getHours()).slice(-2);
  let min = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);
  let result = "";
  if (dateNum != 0) {
    result = hour + ":" + min;
    // result = hour + ":" + min +":" + seconds;
  }
  return result
};


export const dateFormatType = (dateNum) => {
  let date = new Date(dateNum);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hour = ("0" + date.getHours()).slice(-2);
  let min = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);
  // let result = "";
  if (dateNum != 0) {
    // result = year + "-" + month + "-" +day
    result = `${year}-${month+1}-${day}`
    // result = hour + ":" + min +":" + seconds;
  }
  return result
}