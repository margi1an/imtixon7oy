import React, { useState } from "react";
import { db, storage } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '../App.css'
import { FaFileAlt } from "react-icons/fa";

function Cart() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carName: "",
    price: "",
    photoFile: null,
    imageURL: "",
    category: "",
    comment: "",
  });

  const [errors, setErrors] = useState({
    carName: "",
    price: "",
    photoFile: "",
    imageURL: "",
    category: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.carName) {
      newErrors.carName = "Car name is required.";
      isValid = false;
    }

    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Valid price is required.";
      isValid = false;
    }

    if (!formData.photoFile && !formData.imageURL) {
      newErrors.photoFile = "At least one image source (file or URL) is required.";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
      isValid = false;
    }

    if (!formData.comment) {
      newErrors.comment = "Comment is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      let imageURL = formData.imageURL;
      if (formData.photoFile) {
        const storageRef = ref(storage, `cars/${formData.photoFile.name}`);
        await uploadBytes(storageRef, formData.photoFile);
        imageURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "cars"), {
        carName: formData.carName,
        price: formData.price,
        imageURL,
        category: formData.category,
        comment: formData.comment,
      });

      toast.success("Car added successfully! ✔");
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding car. Please try again.");
    }
  };

  return (
    <div className="cardAdd mx-auto mt-20 w-full max-w-2xl p-4 md:w-2/3 lg:w-1/2">
      <h1 className="text-2xl text-center font-bold mb-6">Create New Car</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <span>Car Name</span>
        <input
          type="text"
          name="carName"
          value={formData.carName}
          onChange={handleChange}
          placeholder="Car Name | Type"
          className={`input input-bordered w-full h-15 ${errors.carName ? 'border-red-500' : ''}`}
        />
        {errors.carName && <p className="text-red-500 text-sm">{errors.carName}</p>}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price : </span>
          </div>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Car Price"
            className={`input input-bordered h-15 w-full ${errors.price ? 'border-red-500' : ''}`}
          />
        </label>
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <label htmlFor="photoFile" className="form-label">
          Photo File
        </label>
        <div className="file-upload text-center">
          <input
            type="file"
            name="photoFile"
            id="photoFile"
            accept="image/*"
            onChange={handleChange}
            className={`file-input ${errors.photoFile ? 'border-red-500' : ''}`}
          />
          <label htmlFor="photoFile" className="file-icon">
            <FaFileAlt className="w-10 h-10" />
          </label>
        </div>
        {errors.photoFile && <p className="text-red-500 text-sm">{errors.photoFile}</p>}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Car Image URL:</span>
          </div>
          <input
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="Type here"
            className={`input input-bordered w-full ${errors.imageURL ? 'border-red-500' : ''}`}
          />
        </label>
        {errors.imageURL && <p className="text-red-500 text-sm">{errors.imageURL}</p>}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`select w-full input input-bordered ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select a category</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Daewoo">Daewoo</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Bmw">Bmw</option>
          </select>
        </label>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Comment about the car :</span>
          </div>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className={`textarea textarea-bordered h-24 w-full ${errors.comment ? 'border-red-500' : ''}`}
            placeholder="Enter your comment : "
          ></textarea>
        </label>
        {errors.comment && <p className="text-red-500 text-sm">{errors.comment}</p>}

        <button type="submit" className="btn btn-secondary w-full mt-4 mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Cart;
