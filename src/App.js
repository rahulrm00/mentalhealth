import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CheckInForm from "./components/CheckInForm";
import Register from "./components/register";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/checkin" element={<CheckInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
