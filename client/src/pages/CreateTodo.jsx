import React, { useRef, useEffect } from "react";

const CreateTodo = ({ setDisplayForm, displayForm }) => {
  const modelRef = useRef(null);
  const OnClickOutside = (e) => {
    if (!modelRef.current.contains(e.target)) {
      setDisplayForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", OnClickOutside);

    return () => {
      document.removeEventListener("mousedown", OnClickOutside);
    };
  }, [displayForm]);
  return (
    <form
      className="absolute m-auto inset-0 bg-indigo-400 w-2/6 h-3/5 flex flex-col p-3 gap-3 rounded-xl"
      ref={modelRef}
    >
      <input type="text" placeholder="Title" className="p-3 rounded-md" />
      <input type="text" placeholder="Description" className="p-3 rounded-md" />
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
