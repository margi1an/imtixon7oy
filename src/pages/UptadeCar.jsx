import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../app/cartSlice"; 

const UpdateCar = () => {
  const [car, setCar] = useState(null);
  const [carName, setCarName] = useState("");
  const [comment, setComment] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carDoc = doc(db, "cars", id);
        const carSnap = await getDoc(carDoc);
        if (carSnap.exists()) {
          const carData = carSnap.data();
          setCar(carData);
          setCarName(carData.carName);
          setComment(carData.comment);
          setImageURL(carData.imageURL);
        } else {
          toast.error("Car not found");
        }
      } catch (error) {
        console.error("Error fetching car: ", error);
        toast.error("Error fetching car details");
      }
    };

    fetchCar();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const carDoc = doc(db, "cars", id);
      await updateDoc(carDoc, { carName, comment, imageURL });
      toast.success("Car updated successfully!");

      dispatch(updateCartItem({
        id,
        updatedItem: { carName, comment, imageURL }
      }));

      navigate("/");
    } catch (error) {
      console.error("Error updating car: ", error);
      toast.error("Error updating car");
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Update Car</h1>
      <div className="max-w-md mx-auto">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Car Name</span>
          </label>
          <input
            type="text"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Comment</span>
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <button onClick={handleUpdate} className="btn btn-primary">
          Update Car
        </button>
      </div>
    </div>
  );
};

export default UpdateCar;
