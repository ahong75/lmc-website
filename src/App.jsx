import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tutorials from "./pages/Tutorials";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tutorials />} />
      </Routes>
    </Router>
  );
};

export default App;
