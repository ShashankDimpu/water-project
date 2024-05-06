import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Landing = ({ consumptionData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Consumption Data',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.9)' // Lighter grid lines
        }
      }
    }
  };

  const labels = consumptionData.map(data => `${data.FromTime} - ${data.ToTime} hrs`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Quantity',
        data: consumptionData.map(data => data.Quantity),
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
      },
    ],
  };

  return (
    <div style={{ height: '400px', width: '600px', textAlign:'center', marginLeft: '430px'}}> {/* Adjust size here */}
      <h1>Welcome to Your Dashboard</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Landing;
