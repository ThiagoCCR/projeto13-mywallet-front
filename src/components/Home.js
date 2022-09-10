import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { getLogsFromAPI } from "../services/myWallet";
import Log from "./Log";

export default function Home() {
  const [entryLog, setEntryLog] = useState(null);
  const { userData } = useContext(UserContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    getLogsFromAPI(config)
      .then((res) => {
        console.log(res.data);
        setEntryLog(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }, [userData]);

  useEffect(() => {
    let totalVal = 0;
    if (entryLog === null) {
      return;
    }
    console.log("passeiaq");
    for (let i = 0; i < entryLog.length; i++) {
      let iteratedVal = Number(entryLog[i].value);
      if (entryLog[i].type === "outcome") {
        totalVal = totalVal - iteratedVal;
      } else {
        totalVal = totalVal + iteratedVal;
      }
    }
    totalVal = totalVal.toFixed(2);
    setTotal(totalVal);
  }, [entryLog]);

  return (
    <Wrapper>
      <Header>
        <h1>Olá, {userData.name}</h1>
        <Link to={"/"}>
          <ion-icon name="exit-outline"></ion-icon>
        </Link>
      </Header>
      <LogContainer>
        {entryLog ? (
          <p>Não há registros de entrada ou saída</p>
        ) : (
          entryLog.map((val, i) => (
            <Log
              key={i}
              description={val.description}
              value={val.value}
              date={val.date}
              type={val.type}
            />
          ))
        )}
        {entryLog ? (
          <div></div>
        ) : (
          <div>
            <Total totalVal={total}>
              <div>
                <p>SALDO</p>
              </div>
              <div>
                <h2>{total}</h2>
              </div>
            </Total>
          </div>
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
            <p>Nova saída</p>
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
  overflow-y: scroll;
  justify-content: flex-start;
  overflow-x: hidden;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 0px;
  position: relative;
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

const Total = styled.div`
  position: absolute;
  bottom: 10px !important;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: space-between !important;
  left: 10px;
  p {
    font-family: "Raleway";
    font-weight: 700;
    color: #000000;
    margin-top: 0px;
    font-size: 17px;
  }
  h2 {
    font-family: "Raleway";
    font-weight: 700;
    color: ${(props) => (props.totalVal > 0 ? "#03AC00" : "#C70000")};
    margin-top: 0px;
    font-size: 17px;
  }
`;
