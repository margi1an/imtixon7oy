import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const PieChart = () => {
  const [carData, setCarData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        const cars = querySnapshot.docs.map(doc => doc.data());

        const carCategories = cars.map(car => car.carName);
        const carCounts = carCategories.reduce((acc, car) => {
          acc[car] = (acc[car] || 0) + 1;
          return acc;
        }, {});

        setCategories(Object.keys(carCounts));
        setSeries(Object.values(carCounts));
        setCarData(cars);
      } catch (error) {
        console.error('Error fetching cars: ', error);
      }
    };

    fetchCars();
  }, []);

  const options = {
    series: series,
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="p-6 text-center mb-4 capitalize">
      <h1 className="text-3xl font-bold mb-4">Car buy</h1>
      <div className='ml-[400px] mt-[20px]' id="chart">
        <ApexCharts options={options} series={series} type="pie" width={480} />
      </div>
    </div>
  );
};

export default PieChart;
