// src/pages/ChartPage.jsx
import React from 'react';
import Chart from '../components/Charts';
import Pie from '../components/Pie';


const ChartPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Chart />
      <Pie></Pie>
    </div>
  );
};

export default ChartPage;
