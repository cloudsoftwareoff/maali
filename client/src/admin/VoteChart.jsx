import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const VoteChart = ({ votesByHour }) => {
  // Extract data for chart
  const hours = votesByHour.map(entry => entry.hour);
  const votes = votesByHour.map(entry => entry.votes);

  // Fill the gaps in the data array with 0 votes for missing hours
  const completeData = Array.from({ length: Math.max(...hours) + 1 }, (_, index) => ({
    hour: index,
    votes: hours.includes(index) ? votes[hours.indexOf(index)] : 0,
  }));

  const data = {
    labels: completeData.map(entry => entry.hour),
    datasets: [
      {
        label: 'Votes by Hour',
        data: completeData.map(entry => entry.votes),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: Math.min(...hours),
        max: Math.max(...hours),
        ticks: {
          callback: value => `${value}:00`,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false, // Set this to false to adjust the chart size
    responsive: false,           // Set this to true for responsiveness
    width: 400,                 // Set the width of the chart
    height: 200,                // Set the height of the chart
  };
  

  return (
    <div>
      <h2>Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default VoteChart;
