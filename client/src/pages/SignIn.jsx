import React, { useState } from "react";
import { useEffect } from "react";
import todoImg from "../assets/todoImg.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/myContext";
const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;
const SignIn = () => {
  const { loggedIn, setLoggedIn } = useMyContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // state for error handling
  const [error, setError] = useState("");
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  // function that runs when signin is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    // consuming the api from the backend
    const response = await fetch(`${URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // converting the response to json format
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
      return;
    }
    setLoggedIn(true);
    navigate("/front");
  };
  return (
    <main className="bg-gray-200 h-screen">
      <section className="flex h-full gap-40">
        <div className=" ml-7 w-1/3 mb-7 mt-7 max-md:mr-2 hidden lg:block">
          <img
            src={todoImg}
            alt="productive"
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
        <div className="mt-7 max-lg:m-auto w-1/4 max-xl:w-5/12 max-lg:w-3/4">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <form className="flex flex-col gap-3 mt-5 w-full">
            <div className="flex flex-col  ">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="p-2 rounded-md w-full indent-1"
                name="email"
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
            <p className="ml-auto text-blue-700">Forgot Password?</p>
            <div className="m-auto w-full">
              <button
                className="bg-gray-700 text-white p-3 rounded-lg w-full mt-5 hover:bg-gray-950 duration-200"
                onClick={handleSubmit}
              >
                Sign In
              </button>
              <p className="mt-4 flex justify-center">
                <span>Do not have an account?</span>
                <Link to="/signup" className="underline">
                  <span className="text-blue-700">Sign up</span>
                </Link>
              </p>
              {error && (
                <p className="text-red-900 bg-red-200 p-3 rounded-md mb-[-2rem] mt-1">
                  {error}
                </p>
              )}
              <div className="flex w-full mt-12 items-center gap-3">
                <span className=" grow h-0.5 bg-gray-500 inline-block"></span>
                <p>Or</p>
                <span className=" grow h-0.5 bg-gray-500 inline-block"></span>
              </div>
              <button className="bg-white text-black p-3 rounded-lg w-full mt-5 flex items-center justify-center gap-2">
                <FcGoogle size={30} /> Sign In with Google
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
