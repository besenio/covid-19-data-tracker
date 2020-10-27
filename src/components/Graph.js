import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
   legend: {
      display: false,
   },
   elements: {
      point: {
         radius: 0,
      },
   },
   maintainAspectRatio: false,
   tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
         label: function (tooltipItem, data) {
            return numeral(tooltipItem.value).format("+0,0");
         },
      },
   },
   scales: {
      xAxes: [
         {
            type: "time",
            time: {
               format: "MM/DD/YY",
               tooltipFormat: "ll",
            },
         },
      ],
      yAxes: [
         {
            gridLines: {
               display: false,
            },
            ticks: {
               // Include a dollar sign in the ticks
               callback: function (value, index, values) {
                  return numeral(value).format("0a");
               },
            },
         },
      ],
   },
};

const buildChartData = (data, casesType='cases') => {
   const chartData = [];
   let lastDataPoint;

   for (let date in data.cases) {
      if (lastDataPoint) {
         const newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint
         }
         chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
   }
   return chartData
}

function Graph({ className, casesType='cases' }) {
   const [data, setData] = useState({});

   let changeBackgroudColor;
   if (casesType === 'recovered') {
      changeBackgroudColor = 'yellowgreen';
   } else {
      changeBackgroudColor = 'rgba(204, 16, 52, 0.5)'
   }

   useEffect(() => {
      const fetchData = async () => {
         await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
               const chartData = buildChartData(data, casesType);
               setData(chartData);
            });
         }
         fetchData();
      }, [casesType]);

   return (
      <div className={className}>
         {data?.length > 0 && ( //data && data.length
            <Line
               options={options}
               data={{
                  datasets: [{
                     backgroundColor: changeBackgroudColor,
                     data: data
                  }]
               }} 
            />
         )}
      </div>
   );
}

export default Graph;