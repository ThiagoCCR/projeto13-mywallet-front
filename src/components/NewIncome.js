import { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function NewIncome() {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const { userData } = useContext(UserContext);


  function handleFormData(e) {
    e.preventDefault();
    const body  = {value, description};
    //pegar token
    //pegar username
    //postinfo

  }

  return (
    <Wrapper>
      <Container>
        <h1>Nova entrada</h1>
        <form onSubmit={handleFormData}>
          <input
            name="value"
            placeholder="Valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <input
            name="description"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Link to={"/home"}>
          <button type="submit">Salvar entrada</button>
          </Link>
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
