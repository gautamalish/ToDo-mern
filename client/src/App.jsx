import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import FrontPage from "./pages/FrontPage";
import { Navigate } from "react-router-dom";
import { useMyContext } from "./context/myContext";
function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const { loggedIn, setLoggedIn } = useMyContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route index path="/signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route
          path="/front"
          element={
            loggedIn ? (
              <FrontPage
                selectedTodoId={selectedTodoId}
                displayForm={displayForm}
                setUpdateForm={setUpdateForm}
                setDisplayForm={setDisplayForm}
                updateForm={updateForm}
                setSelectedTodoId={setSelectedTodoId}
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
