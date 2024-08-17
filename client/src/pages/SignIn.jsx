import React from "react";
import todoImg from "../assets/todoImg.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const navigate = useNavigate();
  return (
    <main className="bg-gray-200 h-screen">
      <section className="flex h-full gap-40">
        <div className=" ml-7 w-1/3 mb-7 mt-7 max-md:mr-2 hidden md:block">
          <img
            src={todoImg}
            alt="productive"
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="mt-7 max-md:m-auto ">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <form className="flex flex-col gap-3 mt-5">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                className="p-2 rounded-md w-96 indent-1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Password</label>
              <input
                type="text"
                placeholder="Password"
                id="email"
                className="p-2 rounded-md w-96 indent-1"
              />
            </div>
            <p className="ml-auto text-blue-700">Forgot Password?</p>
            <div className="m-auto">
              <button
                className="bg-gray-700 text-white p-3 rounded-lg w-96 mt-5 hover:bg-gray-950 duration-200"
                onClick={() => navigate("/front")}
              >
                Sign In
              </button>
              <p className="mt-4 flex justify-center">
                <span>Do not have an account?</span>
                <Link to="/signup" className="underline">
                  <span className="text-blue-700">Sign up</span>
                </Link>
              </p>
              <div className="flex w-full mt-12 items-center gap-3">
                <span className=" grow h-0.5 bg-gray-500 inline-block"></span>
                <p>Or</p>
                <span className=" grow h-0.5 bg-gray-500 inline-block"></span>
              </div>
              <button className="bg-white text-black p-3 rounded-lg w-96 mt-5 flex items-center justify-center gap-2">
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
