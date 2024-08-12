import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between bg-gray-200 p-3 items-center">
      <h1 className="text-3xl ">
        <span className="text-gray-500">ToDo</span>
        <span className="text-blue-400">Keep</span>
      </h1>
      <div>
        <button className="text-lg bg-red-300 rounded-md p-2 text-black hover:bg-red-500 hover:text-white duration-200">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
