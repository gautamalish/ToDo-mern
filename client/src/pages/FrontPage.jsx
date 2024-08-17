import React from "react";
import Header from "../components/Header";
import List from "../components/List";
import CreateTodo from "../components/CreateTodo";
import UpdateTodo from "../components/UpdateTodo";
const FrontPage = ({
  displayForm,
  setUpdateForm,
  updateForm,
  setSelectedTodoId,
  selectedTodoId,
  setDisplayForm,
}) => {
  return (
    <main className="h-screen flex flex-col">
      <Header displayForm={displayForm} setDisplayForm={setDisplayForm} />
      <List
        displayForm={displayForm}
        setUpdateForm={setUpdateForm}
        updateForm={updateForm}
        setSelectedTodoId={setSelectedTodoId}
      />
      {displayForm && (
        <CreateTodo displayForm={displayForm} setDisplayForm={setDisplayForm} />
      )}
      {updateForm && (
        <UpdateTodo
          setUpdateForm={setUpdateForm}
          updateForm={updateForm}
          selectedTodoId={selectedTodoId}
        />
      )}
    </main>
  );
};

export default FrontPage;
