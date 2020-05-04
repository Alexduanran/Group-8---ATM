import React from "react";
import Chart from 'react-apexcharts';

export const LineChart = ({ originalArr, predictedArr }) => {

    const options = {chart: {
        id: "basic-line"
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            }
          },
          title: {
            text: 'Price'
          },
        },
        xaxis: {
          labels: {hideOverlappingLabels: true,
                  style: {
                    fontSize: '8px'
                  }
          },
          title: {
            text: 'Days Since 2005'
          }
        },
        annotations: {
          xaxis: [{
            x: predictedArr.length-100,
            strokeDashArray: 0,
            borderColor: '#775DD0',
            label: {
              borderColor: '#775DD0',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'Testing',
            }
          }]}
    };
    
    const series = [
        {
          name: "Original Price",
          data: originalArr
        },
        {
          name: "Predicted Price",
          data: predictedArr
        },

    ];

    return (
        <Chart
          options={options}
          series={series}
          type="line"
          width="1000"
        />
    )
}