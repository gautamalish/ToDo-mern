import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const CreateTodo = ({ setDisplayForm, displayForm }) => {
  console.log(URL);
  const [error, setError] = useState("");
  const modelRef = useRef(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const OnClickOutside = (e) => {
    if (!modelRef.current.contains(e.target)) {
      setDisplayForm(false);
    }
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    document.addEventListener("mousedown", OnClickOutside);

    return () => {
      document.removeEventListener("mousedown", OnClickOutside);
    };
  }, [displayForm]);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
      return;
    }
    if (response.ok) {
      Swal.fire({
        title: "Added New Todo?",
        text: "You added a new Todo",
        icon: "success",
      });
      setError("");
      setFormData({ title: "", description: "" });
      setDisplayForm(false);
    }
  }
  useEffect(() => {});
  return (
    <form
      className="absolute m-auto inset-0 bg-indigo-400 w-2/6 h-3/5 flex flex-col p-3 gap-3 rounded-xl max-sm:w-4/5 max-lg:w-3/4 max-xl:w-4/5"
      ref={modelRef}
    >
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
        onClick={(e) => handleSubmit(e)}
        className="bg-blue-200 p-2 rounded-md hover:bg-blue-500 hover:text-white duration-200"
      >
        Submit
      </button>
      <button
        onClick={() => setDisplayForm(false)}
        className="bg-red-200 p-2 rounded-md hover:bg-red-500 hover:text-white duration-200"
      >
        Close
      </button>
    </form>
  );
};

export default CreateTodo;
