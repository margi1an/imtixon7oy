import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";
import { getAuth, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import vidioLog from '../vidio/car.mp4'
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const [forgetPassword, setForgetPassword] = useState(true);
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      if (userData.email.trim() && userData.password?.trim()) {
        signInWithEmail(userData.email, userData.password);
      }
      if (!userData.email && !userData.password) {
        toast.error('Email and Password are empty');
      }
      if (!userData.email.trim()) {
        setErrors((prev) => {
          return { ...prev, email: 'input-error' }
        })
      }
      if (!userData.password?.trim()) {
        setErrors((prev) => {
          return { ...prev, password: 'input-error' }
        })
      }
    }
    if (!forgetPassword && userData) {
      sendPasswordResetEmail(auth, userData.email.trim())
        .then(() => {
          toast.success('Sent password reset link successfully! ✋😀');
          setForgetPassword(!forgetPassword);
        })
        .catch(() => {
          toast.error('Something went wrong! 😥');
        })
    }
  }, [userData]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <video
        src={vidioLog}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 z-[-1] object-cover"
        muted
        autoPlay
        loop
      ></video>
      <Form
        className="w-96 p-8 shadow-lg rounded-lg flex flex-col gap-y-4 bg-gray-100/50"
        method="post"
      >
        <h1 className="text-5xl font-semibold">Login</h1>
        <FormInput
          type="email"
          name="email"
          labelText="Email"
          status={errors.email}
        ></FormInput>
        {forgetPassword && <FormInput
          type="password"
          name="password"
          labelText="Password"
          status={errors.password}
        ></FormInput>}
        <div className="w-full">
          {!isPending && (
            <button className="btn btn-primary mb-4 btn-block">
              {forgetPassword ? 'Login' : 'Send'}
            </button>
          )}
          {isPending && (
            <button disabled className="btn mb-4 btn-primary btn-block">
              {forgetPassword ? 'Loading ...' : 'Sending ...'}
            </button>
          )}
           <div className="text-center">
          <button
            className="btn btn-secondary btn-block"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>
        </div>
        <div className="text-center">
          Already registered?{" "}
          <Link className="text-primary" to="/register">
            Register
          </Link>
        </div>
        <div className="text-center">
          <p>
            Forgot Password?{" "}
            <button onClick={() => setForgetPassword(!forgetPassword)} className="btn btn-primary text-slate-50 btn-sm ml-3" type="button">
              {forgetPassword ? 'Change Password' : 'Back to Login'}
            </button>
          </p>
        </div>
       
      </Form>
    </div>
  );
}

export default Login;
