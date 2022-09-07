import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Home from "./Home.js";
import NewIncome from "./NewIncome.js";
import NewOutcome from "./NewOutcome.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/novaentrada" element={<NewIncome />} />
        <Route path="/novasaida" element={<NewOutcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
