import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const List = () => {
  return (
    <section className="bg-amber-100 grow">
      <div className="m-auto p-3 w-fit">
        <h3 className="text-2xl font-bold text-red-400">Your Todos</h3>
      </div>
      <div className="bg-green-200 w-2/5 m-auto h-4/5 p-4 overflow-auto">
        <div className="w-3/4 m-auto bg-blue-400 p-3 rounded-md flex justify-between items-center">
          <div>
            <h3 className="text-xl">Title</h3>
            <p>Description</p>
          </div>
          <div className="flex gap-2">
            <FaEdit size={25} className="cursor-pointer" />
            <MdDelete size={25} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default List;
