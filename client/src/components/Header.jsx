import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMyContext } from "../context/myContext";
const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const Header = ({ setDisplayForm, displayForm }) => {
  const navigate = useNavigate();
  // state to check if a user is logged in
  const { loggedIn, setLoggedIn } = useMyContext();
  const [error, setError] = useState("");
  async function onLogout() {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You are logging out!",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });
    // checking if user confirmed the logout and them logging them out
    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(`${URL}/logout`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        if (response.ok) {
          setLoggedIn(false);
          navigate("/signin");
        } else {
          setError(result.error);
        }
      } catch (err) {
        Swal.update({
          icon: "error",
          title: "Logout Failed",
          text: error || "Something went wrong.",
          confirmButtonColor: "red",
          showCancelButton: false,
          confirmButtonText: "Close",
        });
      }
    }
  }
  return (
    <header className="flex justify-between bg-gray-200 p-3 items-center">
      <h1 className="text-3xl max-sm:text-2xl">
        <span className="text-gray-500">ToDo</span>
        <span className="text-blue-400">Keep</span>
      </h1>
      <div className="flex gap-3">
        <button
          className="text-lg max-sm:text-md bg-blue-300 rounded-md p-2 text-black hover:bg-blue-500 hover:text-white duration-200"
          onClick={() => setDisplayForm(true)}
        >
          Create Todo
        </button>
        <button
          className="text-lg bg-red-300 rounded-md p-2 text-black hover:bg-red-500 hover:text-white duration-200"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
