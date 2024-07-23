// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FaceRecognition from "./FaceRecognition";
import NotMyUser from "./NotMyUser";
import Registration from "./Registration";
import RegistrationSuccess from "./RegistrationSuccess";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FaceRecognition />} />
        <Route path="/not-my-user" element={<NotMyUser />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
