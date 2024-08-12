import { useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
function App() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
      <List />
    </main>
  );
}

export default App;
