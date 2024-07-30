import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useRegister } from "../hooks/useRegister";
import toast from "react-hot-toast";
import vidioLogg from '../vidio/car2.mp4';

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  let photoFile = formData.get("photoFile");
  return { email, password, displayName, photoURL, photoFile };
};

function Register() {
  const userData = useActionData();
  const { registerWithEmail, isPending } = useRegister();
  const [errors, setErrors] = useState({
    photoURL: "",
    email: "",
    password: "",
    displayName: "",
  });

  useEffect(() => {
    if (userData) {
      if (userData) {
        registerWithEmail(
          userData.email,
          userData.password,
          userData.displayName,
          userData.photoURL
        );
      }
      if (
        !userData.email &&
        !userData.password &&
        !userData.displayName &&
        !userData.photoURL
      ) {
        toast.error("All inputs are empty !!!");
      }
      if(!userData.displayName.trim()){
        setErrors((prev) => {
          return {...prev , displayName : 'input-error'}
        })
      }
      if(!userData.photoURL.trim()){
        setErrors((prev) => {
          return {...prev , photoURL : 'input-error'}
        })
      }
      if(!userData.email.trim()){
        setErrors((prev) => {
          return {...prev , email : 'input-error'}
        })
      }
      if(!userData.password.trim()){
        setErrors((prev) => {
          return {...prev , password : 'input-error'}
        })
      }
    }
  }, [userData]);

  return (
    <div className="h-screen flex items-center justify-center">
      <video
        src={vidioLogg}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 z-[-1] object-cover"
        muted
        autoPlay
        loop
      ></video>
      <Form
        className=" w-96 p-8 shadow-lg rounded-lg flex flex-col gap-y-4  bg-gray-100/50"
        method="post"
        encType="multipart/form-data"
      >
        <h1 className="text-5xl font-semibold text-slate-900">Register</h1>
        <FormInput
          status={errors.displayName}
          type="text"
          name="displayName"
          labelText="Display Name"
        ></FormInput>
        <FormInput
          status={errors.photoURL}
          type="url"
          name="photoURL"
          labelText="Photo URL"
        ></FormInput>
        <div className={`form-group ${errors.photoURL}`}>
          <label htmlFor="photoFile" className="form-label">
            Photo File
          </label>
          <input
            type="file"
            name="photoURL"
            id="photoFile"
            accept="image/*"
            className="form-control input"
          />
        </div>
        <FormInput
          status={errors.email}
          type="email"
          name="email"
          labelText="Email"
        ></FormInput>
        <FormInput
          status={errors.password}
          type="password"
          name="password"
          labelText="Password"
        ></FormInput>
        <div className="w-full">
          {!isPending && (
            <button className="btn btn-primary btn-block">Register</button>
          )}
          {isPending && (
            <button disabled className="btn btn-primary btn-block">
              Registered ....
            </button>
          )}
        </div>
        <div className="text-center">
          Already registered?{" "}
          <Link className="text-primary" to="/login">
            Login
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
