import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

function Graph() {
   const [data, setData] = useState({});

   useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/historical/aa?lastdays=120')
         .then(response => response.json())
         .then(data => {

         })
   }, [])

   return (
      <div>
         <h1>Graph</h1>
      </div>
   )
}

export default Graph;