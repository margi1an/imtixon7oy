import React from "react";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="grid grid-cols-3  align-elements mb-[20px] gap-16 mt-[50px]">
      <Link to="/product">
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              className="rounded w-96 h-56"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5twXDXgVltehnPcfVbtwv5u6TpZc18-m4XQ&s"
              alt="Shoes"
            />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title">Bmw M5</h2>
            <p>Bmw M5 Compititon norm car ! ✔</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
