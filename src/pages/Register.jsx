import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useRegister } from "../hooks/useRegister";
import toast from "react-hot-toast";
import vidioLogg from '../vidio/car2.mp4';
import { FaFileAlt, FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from '../firebase/firebaseConfig'; 
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import './Register.css'

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
      if (userData.email.trim() && userData.password?.trim()) {
        registerWithEmail(
          userData.email,
          userData.password,
          userData.displayName,
          userData.photoURL
        );
      } else {
        toast.error("All inputs are empty !!!");
      }

      if (!userData.displayName.trim()) {
        setErrors(prev => ({ ...prev, displayName: 'input-error' }));
      }
      if (!userData.photoURL.trim()) {
        setErrors(prev => ({ ...prev, photoURL: 'input-error' }));
      }
      if (!userData.email.trim()) {
        setErrors(prev => ({ ...prev, email: 'input-error' }));
      }
      if (!userData.password.trim()) {
        setErrors(prev => ({ ...prev, password: 'input-error' }));
      }
    }
  }, [userData]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Handle user information (e.g., save to database, etc.)
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast.error(`Error: ${error.message}`);
    }
  };

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
        className="w-96 p-8 shadow-lg rounded-lg flex flex-col gap-y-4 bg-gray-100/50"
        method="post"
        encType="multipart/form-data"
      >
        <h1 className="text-5xl font-semibold text-slate-900">Register</h1>
        <FormInput
          status={errors.displayName}
          type="text"
          name="displayName"
          labelText="Display Name"
        />
        <div className="flex gap-4 items-center">
          <FormInput
            status={errors.photoURL}
            type="url"
            name="photoURL"
            labelText="Photo URL"
          />
          <div className={`form-group ${errors.photoURL}`}>
            <div className="file-upload mt-9 text-center">
              <input
                type="file"
                name="photoFile"
                id="photoFile"
                accept="image/*"
                className='file-input w-[100%]'
              />
              <label htmlFor="photoFile" className="file-icon">
                <FaFileAlt className="w-6 h-6" />
              </label>
            </div>
          </div>
        </div>
        <FormInput
          status={errors.email}
          type="email"
          name="email"
          labelText="Email"
        />
        <FormInput
          status={errors.password}
          type="password"
          name="password"
          labelText="Password"
        />
        <div className="w-full">
          {!isPending && (
            <button className="btn btn-primary btn-block">Register</button>
          )}
          {isPending && (
            <button disabled className="btn btn-primary btn-block">
              Registering ....
            </button>
          )}
        </div>
        <div className="text-center">
          <button
            className="btn btn-secondary btn-block"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
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
