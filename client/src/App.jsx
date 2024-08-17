import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import FrontPage from "./pages/FrontPage";
function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <FrontPage
              selectedTodoId={selectedTodoId}
              displayForm={displayForm}
              setUpdateForm={setUpdateForm}
              setDisplayForm={setDisplayForm}
              updateForm={updateForm}
              setSelectedTodoId={setSelectedTodoId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
