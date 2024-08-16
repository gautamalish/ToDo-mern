import React from "react";
const Header = ({ setDisplayForm, displayForm }) => {
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
        <button className="text-lg bg-red-300 rounded-md p-2 text-black hover:bg-red-500 hover:text-white duration-200">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
