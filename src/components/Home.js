import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Home() {
  const [entryLog, setEntryLog] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const userEmail = userData.email;
    //pegar logs da API
  }, []);

  return (
    <Wrapper>
      <Header>
        <h1>Olá, Fulano</h1>
        <Link to={"/"}>
          <ion-icon name="exit-outline"></ion-icon>
        </Link>
      </Header>
      <LogContainer>
        {entryLog ? (
          <p>entradas</p>
        ) : (
          <p>Não há registros de entrada ou saída</p>
        )}
      </LogContainer>
      <Footer>
        <Link to={"/novaentrada"}>
          <div>
            <ion-icon name="add-circle-outline"></ion-icon>
            <p>Nova entrada</p>
          </div>
        </Link>
        <Link to={"/novasaida"}>
          <div>
            <ion-icon name="remove-circle-outline"></ion-icon>
            <p>Nova entrada</p>
          </div>
        </Link>
      </Footer>
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

const Header = styled.div`
  width: 326px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  h1 {
    font-family: Raleway;
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    line-height: 31px;
  }
  ion-icon {
    font-size: 34px;
    color: #ffffff;
  }
`;

const LogContainer = styled.div`
  width: 326px;
  height: 446px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  p {
    margin-top: 50%;
    width: 60%;
    font-family: "Raleway";
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
  }
`;

const Footer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 326px;
  flex-direction: row;
  justify-content: space-between;
  div {
    width: 155px;
    height: 114px;
    background: #a328d6;
    border-radius: 5px;
    padding: 10px;
    ion-icon {
      font-size: 30px;
      color: #ffffff;
    }
    p {
      width: 50%;
      color: #ffffff;
      font-family: "Raleway";
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      line-height: 20px;
      margin-top: 15px;
    }
  }
`;
