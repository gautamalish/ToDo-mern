import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
// setting the url as per the environment we're in(development or production)
const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const UpdateTodo = ({ setUpdateForm, updateForm, selectedTodoId }) => {
  const [error, setError] = useState("");
  const modelRef = useRef(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const OnClickOutside = (e) => {
    if (!modelRef.current.contains(e.target)) {
      setFormData({ title: "", description: "" });
      setUpdateForm(false);
    }
  };
  // function to get the data of a particular Todo
  const getSingleTodo = async () => {
    try {
      const response = await fetch(`${URL}/get-one/${selectedTodoId}`);
      const result = await response.json();
      if (!response.ok) {
        setError(result.error);
        return;
      }
      // setting the formdata to the data from the response
      setFormData({ title: result.title, description: result.description });
      setError("");
    } catch (err) {
      setError(err);
    }
  };
  // calling get single todo everytime the updateTodo component mounts
  useEffect(() => {
    getSingleTodo();
  }, []);
  // handling form data changes
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  // closing the update modal when clicked outside
  useEffect(() => {
    document.addEventListener("mousedown", OnClickOutside);

    return () => {
      document.removeEventListener("mousedown", OnClickOutside);
    };
  }, [updateForm]);

  // handling update
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      setError("Please fill up all the fields.");
      return;
    }
    const response = await fetch(`${URL}/update/${selectedTodoId}`, {
      method: "PATCH", //using pach method for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), //sending stringified formdata to the backend
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
      return;
    }
    if (response.ok) {
      Swal.fire({
        title: "Updated",
        text: "You updated the Todo!",
        icon: "success",
      });
      // setting the error and formdata to empty string after updating
      setError("");
      setFormData({ title: "", description: "" });
      setUpdateForm(false);
    }
  }
  return (
    <form
      className="absolute m-auto inset-0 bg-indigo-400 w-2/6 h-3/5 flex flex-col p-3 gap-3 rounded-xl max-sm:w-4/5 max-lg:w-3/4 max-xl:w-4/5"
      ref={modelRef}
    >
      {error && (
        <div className="p-4 mb-2 text-md bg-red-50 text-red-800 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Title"
        className="p-3 rounded-md"
        value={formData.title}
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="Description"
        className="p-3 rounded-md"
        value={formData.description}
        onChange={handleChange}
        name="description"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-200 p-2 rounded-md hover:bg-blue-500 hover:text-white duration-200"
      >
        Update
      </button>
      <button
        onClick={() => {
          setFormData({ title: "", description: "" });
          setUpdateForm(false);
        }}
        className="bg-red-200 p-2 rounded-md hover:bg-red-500 hover:text-white duration-200"
      >
        Close
      </button>
    </form>
  );
};

export default UpdateTodo;
