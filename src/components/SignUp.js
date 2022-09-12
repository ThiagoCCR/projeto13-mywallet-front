import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpAPI } from "../services/myWallet";
import { ThreeDots } from "react-loader-spinner";
import UserContext from "../contexts/UserContext";

export default function Signup() {
  const { isLoading, setisLoading } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSignUp(e) {
    e.preventDefault();
    setisLoading(true);
    const password = e.target[2].value;
    const confirmedPassword = e.target[3].value;

    if (password !== confirmedPassword) {
      setisLoading(false);
      return alert("As senhas estão diferentes!");
    }

    signUpAPI({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
      .then((res) => {
        window.scrollTo(0, 0);
        setisLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setFormData({
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
        });
        alert(error.message);
        setisLoading(false);
      });
  }

  return (
    <Wrapper>
      <Container>
        <h1>MyWallet</h1>
        <Login>
          <form onSubmit={handleSignUp}>
            <input
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleInputChange}
              type="text"
              disabled={isLoading}
              required
            />
            <input
              name="email"
              placeholder="E-mail"
              type="email"
              onChange={handleInputChange}
              value={formData.email}
              disabled={isLoading}
              required
            />
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Senha"
              type="password"
              disabled={isLoading}
              required
            />
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirme a senha"
              type="password"
              disabled={isLoading}
              required
            />
            <button type="submit">
              {isLoading ? (
                <div>
                  <ThreeDots color="#ffffff" />
                </div>
              ) : (
                <p>Cadastrar</p>
              )}
            </button>
          </form>
        </Login>
        <Link to={"/"}>
          <SignIn>
            <h2>Já tem uma conta? Entre agora!</h2>
          </SignIn>
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

const SignIn = styled.div`
  h2 {
    margin-top: 20px;
    text-decoration: underline;
    font-family: "Raleway";
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
  }
`;
