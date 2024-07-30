// src/components/Chart.jsx
import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Chart = () => {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        const cars = querySnapshot.docs.map(doc => doc.data());
        setCarData(cars);
      } catch (error) {
        console.error('Error fetching cars: ', error);
      }
    };

    fetchCars();
  }, []);

  const carNames = carData.map(car => car.carName);
  const carPrices = carData.map(car => car.price);

  const options = {
    series: [
      {
        data: carPrices
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: carNames
    }
  };

  return (
    <div className="p-6 text-center mb-9">
      <h1 className="text-3xl font-bold mb-4">Car Prices</h1>
      <ApexCharts options={options} series={options.series} type="bar" height={200} />
    </div>
  );
};

export default Chart;
