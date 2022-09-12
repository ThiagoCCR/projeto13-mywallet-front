import styled from "styled-components";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInAPI } from "../services/myWallet";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData, isLoading, setisLoading } =
    useContext(UserContext);
  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    setisLoading(true);
    const body = { email, password };

    signInAPI(body)
      .then((res) => {
        window.scrollTo(0, 0);
        setUserData({ name: res.data.name, token: res.data.token });
        setisLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        alert(error.message);
        setisLoading(false);
      });
  }

  return (
    <Wrapper>
      <Container>
        <h1>MyWallet</h1>
        <Login>
          <form onSubmit={handleSignIn}>
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              value={email}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              value={password}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">
              {isLoading ? (
                <div>
                  <ThreeDots color="#ffffff" />
                </div>
              ) : (
                <p>Entrar</p>
              )}
            </button>
          </form>
        </Login>
        <Link to={"/cadastro"}>
          <SignUp>
            <h2>Primeira vez? Cadastre-se!</h2>
          </SignUp>
        </Link>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: Saira Stencil One;
    font-size: 32px;
    font-weight: 400;
    line-height: 50px;
    letter-spacing: 0em;
    color: #ffffff;
    margin-bottom: 5px;
  }
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 325px;
      height: 60px;
      font-family: "Raleway";
      border-radius: 5px;
      background-color: #a328d6;
      font-weight: 700;
      font-size: 20px;
      border: none;
      text-align: center;
      color: #ffffff;
    }
  }
  input {
    font-weight: 400;
    font-family: "Raleway";
    border: none;
    font-size: 20px;
    width: 325px;
    height: 60px;
    border-radius: 5px;
    color: #000000;
    background-color: #ffffff;
    margin-bottom: 10px;
    padding-left: 15px;
  }
`;

const SignUp = styled.div`
  h2 {
    margin-top: 10px;
    text-decoration: underline;
    font-family: "Raleway";
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
  }
`;
