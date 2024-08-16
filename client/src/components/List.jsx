import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_API_URL_PROD;
const List = ({
  displayForm,
  setUpdateForm,
  updateForm,
  setSelectedTodoId,
}) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const getAllList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}`);
      const result = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(result.error);
        return;
      }
      setLoading(false);
      setList(result);
    } catch (err) {
      setLoading(false);
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
        const response = await fetch(`${URL}/delete/${id}`, {
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
      <div className="bg-green-200 w-2/5 max-lg:w-3/4 max-xl:w-4/5 m-auto max-sm:h-[80vh] p-4 h-[80vh] overflow-y-auto max-sm:w-4/5 relative">
        {loading && (
          <p className="absolute inset-0 flex items-center justify-center">
            Loading...
          </p>
        )}
        {!list.length && !loading && (
          <p className="absolute inset-0 flex items-center justify-center">
            You do not have any ToDos. Create some.
          </p>
        )}
        {list.map((item) => {
          return (
            <div
              className="w-11/12 m-auto bg-blue-400 p-3 rounded-md flex gap-5 justify-between items-center max-sm:w-full mt-2"
              key={item._id}
            >
              <div className="overflow-x-hidden">
                <h3 className="text-xl">{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="flex gap-2 max-sm:gap-4">
                <FaEdit
                  size={30}
                  color="blue"
                  className="cursor-pointer"
                  onClick={() => {
                    setUpdateForm(true);
                    setSelectedTodoId(item._id);
                  }}
                />
                <MdDelete
                  size={30}
                  color="rgba(248, 113, 113, var(--tw-bg-opacity))"
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
