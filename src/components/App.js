import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Home from "./Home.js";
import NewIncome from "./NewIncome.js";
import NewOutcome from "./NewOutcome.js";
import UserContext from "../contexts/UserContext.js";
import { useState } from "react";
import PrivatePage from "./PrivatePage";

function App() {
  const [isLoading, setisLoading] = useState(false);

  return (
    <UserContext.Provider value={{ isLoading, setisLoading }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <PrivatePage>
                <Home />
              </PrivatePage>
            }
          />
          <Route
            path="/novaentrada"
            element={
              <PrivatePage>
                <NewIncome />
              </PrivatePage>
            }
          />
          <Route
            path="/novasaida"
            element={
              <PrivatePage>
                <NewOutcome />
              </PrivatePage>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
