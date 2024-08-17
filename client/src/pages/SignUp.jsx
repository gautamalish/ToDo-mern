import React from "react";
import todoImg from "../assets/todoImg.jpg";
import { FcGoogle } from "react-icons/fc";
const SignUp = () => {
  return (
    <main className="bg-gray-200 h-screen">
      <section className="flex h-full gap-40">
        <div className=" ml-7 w-1/3 mb-7 mt-7">
          <img
            src={todoImg}
            alt="productive"
            className="w-full h-full rounded-xl"
          />
        </div>
        <div className="mt-7">
          <h2 className="text-3xl font-bold">Sign Up</h2>
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
            <div className="m-auto">
              <button className="bg-gray-900 text-white p-3 rounded-lg w-96 mt-7">
                Sign Up
              </button>
              <div className="flex w-full mt-12 items-center gap-3">
                <span className=" grow h-0.5 bg-gray-500 inline-block"></span>
                <p>Or</p>
                <span className=" grow h-0.5 bg-gray-500 inline-block"></span>
              </div>
              <button className="bg-white text-black p-3 rounded-lg w-96 mt-5 flex items-center justify-center gap-2">
                <FcGoogle size={30} /> Sign Up with Google
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
