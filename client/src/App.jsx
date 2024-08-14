import { useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodo from "./pages/UpdateTodo";
function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
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
}

export default App;
