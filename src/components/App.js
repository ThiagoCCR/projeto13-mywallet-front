import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Home from "./Home.js";
import NewIncome from "./NewIncome.js";
import NewOutcome from "./NewOutcome.js";
import UserContext from "../contexts/UserContext.js";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState({ image: "", token: "" });
  const [isLoading, setisLoading] = useState(false);


  return (
    <UserContext.Provider value={{ userData, setUserData, isLoading, setisLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/novaentrada" element={<NewIncome />} />
          <Route path="/novasaida" element={<NewOutcome />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
