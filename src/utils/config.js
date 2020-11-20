export const screamingConfig = (e) => {
    
    const data = {
        legend: {
          display: false,
          labels: {
            // boxWidth: 0,
          },
        }, //상단 dataset삭제
        bezierCurve: false,
        scales: {
          yAxes: [
            {
              scaleLabel : {
                display:true,
                labelString: '인원수',
           
              },
              gridLines: { color: "#93adc117", lineWidth: 1 },
              ticks: {
                beginAtZero:true
              }
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "#93adc117",
                lineWidth: 1,
                offsetGridLines: true,
              },
              ticks: {
                autoskip:true,
                maxTicksLimit : 20,
             
              },
            },
          ],
        },
      };

      return data;

}