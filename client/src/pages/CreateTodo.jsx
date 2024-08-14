import React, { useRef, useEffect, useState } from "react";

const CreateTodo = ({ setDisplayForm, displayForm }) => {
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
    const response = await fetch(`http://localhost:3000/create`, {
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
      setError("");
      setFormData({ title: "", description: "" });
      setDisplayForm(false);
    }
  }
  return (
    <form
      className="absolute m-auto inset-0 bg-indigo-400 w-2/6 h-3/5 flex flex-col p-3 gap-3 rounded-xl"
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
