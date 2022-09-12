import { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";
import { createLogInAPI } from "../services/myWallet";

export default function NewIncome() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const { isLoading, setisLoading } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("USER"));

  const navigate = useNavigate();

  function handleFormData(e) {
    e.preventDefault();
    setisLoading(true);

    const formatedValue = Number(value).toFixed(2);

    const body = { value: String(formatedValue), description, type: "income" };
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    createLogInAPI(body, config)
      .then((res) => {
        alert("Log criado com sucesso");
        setisLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.message);
        setisLoading(false);
        alert(error.message);
      });
  }

  return (
    <Wrapper>
      <Container>
        <h1>Nova Entrada</h1>
        <form onSubmit={handleFormData}>
          <input
            name="value"
            placeholder="Valor"
            value={value}
            disabled={isLoading}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <input
            name="description"
            placeholder="Descrição"
            value={description}
            disabled={isLoading}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">
            {isLoading ? (
              <div>
                <ThreeDots color="#ffffff" />
              </div>
            ) : (
              <p>Salvar Entrada</p>
            )}
          </button>
        </form>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-family: Raleway;
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    line-height: 81px;
    margin-right: 160px;
  }
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
