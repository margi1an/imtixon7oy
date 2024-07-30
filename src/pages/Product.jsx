import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/cartSlice";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

function Product() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carDoc = await getDoc(doc(db, "cars", id));
        if (carDoc.exists()) {
          setCar(carDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleIncrease = () => setQuantity(quantity + 1);

  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    if (car) {
      dispatch(addToCart({ ...car, quantity }));
      toast.success(`${quantity} ${car.carName} has been added to the cart! ✔😉`);
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }


  return (
    <div className="align-elements mt-9">
      <div className="text-center mb-9">
        <p className="text-5xl font-semibold">Product :</p>
      </div>
      <div className="flex gap-20">
        <div className="img">
          <img
            className="w-9/6 h-80 object-cover rounded"
            src={car.imageURL}
            alt={car.carName}
          />
        </div>
        <div className="colum-2">
          <div className="flex gap-9 mb-9">
            <h1 className="asad text-2xl font-semibold">Car Name | Model :</h1>
            <h1 className="text-2xl font-semibold">{car.carName}</h1>
          </div>
          <div className="flex gap-9 mb-9 ">
            <h1 className="asad text-2xl font-semibold">Car Price | $ :</h1>
            <h1 className="text-2xl font-semibold">{car.price} $</h1>
          </div>
          <div className="flex gap-9 mb-9">
            <h1 className="asad text-2xl font-semibold">
              Car Category | Style :
            </h1>
            <h1 className="text-2xl font-semibold">{car.category}</h1>
          </div>
          <div className="flex gap-9 mb-4">
            <h1 className="asad text-2xl font-semibold">
              Comment about the car | Description :{" "}
            </h1>
          </div>
          <div className="flex gap-9 mb-9">
            <h1 className="text-2xl font-semibold">{car.comment}</h1>
          </div>
        </div>
      </div>
      <div className="text-center mt-9 mb-9 ">
        <h1 className="text-3xl font-semibold text-slate-300">
          Carousel Items :{" "}
        </h1>
      </div>
      <div className="carousll text-center mt-11 mb-12">
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-2 p-4">
          <div className="carousll text-center mt-11 mb-12">
            <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4">
              <div className="carousel-item">
                <img
                  src={car.imageURL}
                  className="rounded-box w-72 object-cover"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--w20sOWf9-Qx207vHZWowSwcmfr__BVXp4JPcYOySDkJiqKVDGANoQ02HI4aMk6rlQ4&usqp=CAU"
                  className="rounded-box w-72"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIOXmuqeKMiy1YfRvuOnO3eguEEIpE7q1IPQ&s"
                  className="rounded-box w-96"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://takecars.com/media/thumbs/cars/2023/06/IMAGE_2023-06-20_172940.jpg.800x800_q85_crop-scale.jpg.webp"
                  className="rounded-box w-96"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSptyDyzlNyFwTxzpxx_Qp4QND4cMMXXcFKpg&s.webp"
                  className="rounded-box w-96"
                />
              </div>
              <div className="carousel-item">
                {" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZk4epxQOXwDTHiOGOzAkVaCf8Pl30eJYuu_UFNDDix_0FtQZVrltSOzZFJtA5BZTKokc&usqp=CAU"
                  className="rounded-box w-96"
                />{" "}
              </div>{" "}
              <div className="carousel-item">
                {" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZcOI6Bm9lSRglvghajIKudx3MJ-ffMqIzA&s"
                  className="rounded-box w-96"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      </div>
      <div className="text-center mb-9">
        <h1 className="text-3xl font-semibold">To add to the cart 🤷‍♂️</h1>
      </div>
      <div className="add text-center mb-9">
        <h1 className="text-5xl font-semibold mb-4">{quantity}</h1>
        <div className="join join-vertical lg:join-horizontal">
          <button className="btn join-item btn-error" onClick={handleDecrease}>
            -
          </button>
          <button onClick={handleAddToCart} className="btn join-item btn-info">
            Add to Bag
          </button>
          <button
            className="btn join-item btn-primary"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <div className="join justify-end ml-[50px]">
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="2"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="3"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="4"
          />
        </div>
      </div>
    </div>
  );
}

export default Product;
