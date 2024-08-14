import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
const List = ({
  displayForm,
  setUpdateForm,
  updateForm,
  setSelectedTodoId,
}) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const getAllList = async () => {
    try {
      const response = await fetch(`http://localhost:3000`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
        return;
      }
      setList(result);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    getAllList();
  }, [displayForm, updateForm]);

  const deleteList = async (id) => {
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You wont/'t be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (!response.ok) {
          setError(result.error);
        }
        getAllList();
      } catch (err) {
        setError(err);
      }
    }
  };
  return (
    <section className="bg-amber-100 grow">
      <div className="m-auto p-3 w-fit">
        <h3 className="text-2xl font-bold text-red-400">Your Todos</h3>
      </div>
      <div className="bg-green-200 w-2/5 m-auto max-sm:h-96 p-4 h-[40rem] overflow-y-auto max-sm:w-4/5">
        {list.map((item) => {
          return (
            <div
              className="w-11/12 m-auto bg-blue-400 p-3 rounded-md flex justify-between items-center max-sm:w-full mt-2"
              key={item._id}
            >
              <div>
                <h3 className="text-xl">{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="flex gap-2">
                <FaEdit
                  size={25}
                  className="cursor-pointer"
                  onClick={() => {
                    setUpdateForm(true);
                    setSelectedTodoId(item._id);
                  }}
                />
                <MdDelete
                  size={25}
                  className="cursor-pointer"
                  onClick={() => deleteList(item._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default List;
