import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
// setting the url as per the environment we're in(development or production)
const URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;
const List = ({
  displayForm,
  setUpdateForm,
  updateForm,
  setSelectedTodoId,
}) => {
  // some state variables
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const getAllList = async () => {
    // setting the loading to true at the beginning of getting the list
    setLoading(true);
    try {
      // fetching the data from backend
      const response = await fetch(`${URL}`);
      const result = await response.json();
      // setting the loading to false and then setting the error if response is not ok
      if (!response.ok) {
        setLoading(false);
        setError(result.error);
        return;
      }
      // setting the loading to false after retriving the data
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      // setting the list to the data acquired
      setList(result);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };
  // calling getAllList when displayForm or updateForm changes
  useEffect(() => {
    getAllList();
  }, [displayForm, updateForm]);

  // function for deleting a todo
  const deleteList = async (id) => {
    // Using a swal modal
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You wont/n't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    // if user presses delete
    if (confirmation.isConfirmed) {
      try {
        // fetching the delete api from backend
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
        // getting all list again after deletion
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
        {loading && list.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-xl bg-gray-200 bg-opacity-40">
            <div className="w-8 h-8 spinner-border animate-spin border-gray-500 border-4 border-t-transparent inline-block rounded-full"></div>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-xl">
            <div className="w-8 h-8 spinner-border animate-spin border-gray-500 border-4 border-t-transparent inline-block rounded-full"></div>
          </div>
        )}
        {!list.length && !loading && (
          <p className="absolute inset-0 flex items-center justify-center text-xl">
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
