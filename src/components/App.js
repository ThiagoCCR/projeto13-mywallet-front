import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Home from "./Home.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
