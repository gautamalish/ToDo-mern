import { useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import CreateTodo from "./pages/CreateTodo";
function App() {
  const [displayForm, setDisplayForm] = useState(false);
  return (
    <main className="h-screen flex flex-col">
      <Header displayForm={displayForm} setDisplayForm={setDisplayForm} />
      <List />
      {displayForm && (
        <CreateTodo displayForm={displayForm} setDisplayForm={setDisplayForm} />
      )}
    </main>
  );
}

export default App;
