import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts"
import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { round } from "../../utils/format";
import { SaleSuccess } from "../../types/sale";

type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const  BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "% Sucesso",
                data: []                   
            }
        ]
    });

    useEffect( () => {
        axios.get(`${BASE_URL}/sales/success-by-seller`)
        .then( response => {
               const data = response.data as SaleSuccess[];
               const myLabels = data.map(x => x.sellerName);
               const mySeries = data.map(x => round(100.0 *  x.deals /x.visited,1));

               setChartData({
                labels: {
                    categories: myLabels
                },
                series: [
                    {
                        name: "% Sucesso",
                        data: mySeries                   
                    }
                ]
            });
        });

    }, [])    

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

  return (
      <Chart 
           options={ { ...options, xaxis: chartData.labels } }
           series={ chartData.series}
           type="bar"
           height="240"
      />
  );
}

export default BarChart;