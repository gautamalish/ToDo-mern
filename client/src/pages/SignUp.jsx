import React, { useEffect, useState } from "react";
import todoImg from "../assets/todoImg.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  // function that fires when signup button is clicked
  async function handleSubmit(e) {
    e.preventDefault();
    // consuming the api
    const response = await fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json(); //converting the response to json
    if (!response.ok) {
      setError(result.error);
      return;
    }
    // setting the form data to empty after successful signing up
    setFormData({ email: "", password: "", username: "" });
    toast.success(
      "Created an account successfully. Redirecting to Sign in...",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );
    // taking few seconds to navigate to signin
    setTimeout(() => {
      navigate("/signin");
    }, 3000);
  }
  async function handleGoogleSignUp(e) {
    try {
      e.preventDefault();
      window.location.href = `${URL}/auth/google`;
    } catch (error) {
      console.error("Error during Google OAuth initiation:", error);
    }
  }

  return (
    <main className="bg-gray-200 h-screen">
      <ToastContainer />
      <section className="flex h-full gap-40">
        <div className=" ml-7 w-1/3 mb-7 mt-7 max-lg:mr-2 hidden lg:block">
          <img
            src={todoImg}
            alt="productive"
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="mt-7 max-lg:m-auto w-1/4 max-xl:w-5/12 max-lg:w-3/4 ">
          <h2 className="text-3xl font-bold">Sign Up</h2>
          <form className="flex flex-col gap-3 mt-5 w-full">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                className="p-2 rounded-md w-full indent-1"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                className="p-2 rounded-md w-full indent-1"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="p-2 rounded-md w-full indent-1"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="m-auto w-full">
              <Link to="/auth/google">
                <button
                  className="bg-gray-700 text-white p-3 rounded-lg w-full mt-7 hover:bg-gray-950 duration-200"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </Link>
              <p className="mt-4 flex justify-center">
                <span>Already have an account?</span>
                <Link to="/signin" className="underline">
                  <span className="text-blue-700">Sign in</span>
                </Link>
              </p>
              {error && (
                <p className="bg-red-100 text-red-900 p-3 rounded-md mb-[-2rem] mt-1">
                  {error}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
