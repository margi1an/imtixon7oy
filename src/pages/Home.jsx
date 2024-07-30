import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { CiRead } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Loader from "../components/loader";
import './Home.css'
import toast from "react-hot-toast";

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const timeout = setTimeout(() => setLoading(false), 3000);
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carsData);
        clearTimeout(timeout); 
      } catch (error) {
        console.error("Error fetching cars: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cars", id));
      setCars(cars.filter(car => car.id !== id));
     if( toast.success("Car deleted successfully!")){
      navigate('/');
     }
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-center mt-9">
      <h1 className="text-6xl font-bold">Cars:</h1>
      <div className="grid grid-cols-3 align-elements mb-[20px] gap-28 mt-[50px]">
        {cars.map((car) => (
         <Link to = {`/product/${car.id}`}>
           <div className="card bg-base-100 w-96 shadow-xl" key={car.id}>
            <figure>
              <img
                className="rounded w-96 h-56"
                src={car.imageURL}
                alt={car.carName}
              />
            </figure>
            <div className="card-body text-center">
              <div className="text-center">
                <h2 className="font-semibold mb-2 capitalize text-2xl">
                  {car.carName}
                </h2>
              </div>
              <p className="capitalize mb-2">{car.comment}</p>
              <div className="flex gap-2">
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(car.id)}
                >
                  <MdDelete className="w-6 h-6" />
                  Delete
                </button>
                <Link to={`/product/${car.id}`}>
                  <button className="btn btn-primary">
                    <CiRead className="w-6 h-6" />
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </div>
         </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
