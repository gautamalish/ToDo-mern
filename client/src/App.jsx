import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import FrontPage from "./pages/FrontPage";
import { Navigate } from "react-router-dom";
function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route index path="/signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
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
