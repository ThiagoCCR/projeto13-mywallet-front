import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SEC = 1000;
const MIN_60 = SEC * 60 * 60;

export default function PrivatePage({ children }) {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("USER"));

  useEffect(() => {
    if (localStorage.getItem("USER") === null) {
      //return <Navigate to="/" />;
      navigate("/");
    }
  }, [navigate, auth.timestamp, auth.token, children]);

  if (!auth) {
    //return <Navigate to="/" />;
    navigate("/");
    return;
  }

  const now = +new Date();
  const timeLogged = auth.timestamp;

  if (now - timeLogged <= MIN_60) {
    return <>{children}</>;
  } else {
    alert("Faça login novamente...");
    localStorage.clear("USER");
    //return <Navigate to="/" />;
    navigate("/");
  }
}
