import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLogsFromAPI } from "../services/myWallet";
import { IoExitOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import Log from "./Log";

export default function Home() {
  const [entryLog, setEntryLog] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("USER"));

  function Logout() {
    localStorage.removeItem("USER");
    navigate("/");
  }

  const calculateTotal = useCallback(
    (arrayOfLogs) => {
      let totalVal = 0;
      if (arrayOfLogs === null) {
        return;
      }
      for (let i = 0; i < arrayOfLogs.length; i++) {
        let iteratedVal = Number(arrayOfLogs[i].value);
        if (arrayOfLogs[i].type === "outcome") {
          totalVal = totalVal - iteratedVal;
        } else {
          totalVal = totalVal + iteratedVal;
        }
      }
      totalVal = totalVal.toFixed(2);
      setTotal(totalVal);
    },
    [setTotal]
  );

  const getLogs = useCallback(
    (token) => {
      if (!token) {
        alert("Autorização não informada");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      getLogsFromAPI(config)
        .then((res) => {
          setEntryLog(res.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data);
        });
    },
    [setEntryLog]
  );

  useEffect(() => getLogs(userData.token), [getLogs, userData.token]);

  useEffect(() => calculateTotal(entryLog), [entryLog, calculateTotal]);

  return (
    <Wrapper>
      <Header>
        <h1>Olá, {userData.name}</h1>
        <div onClick={() => Logout()}>
          <IconContext.Provider
            value={{
              color: "#FFFFFF",
              className: "global-class-name",
              size: "35px",
            }}
          >
            <div>
              <IoExitOutline />
            </div>
          </IconContext.Provider>
        </div>
      </Header>
      <Container>
        <LogContainer>
          {entryLog.length === 0 ? (
            <p>Não há registros de entrada ou saída</p>
          ) : (
            entryLog.map((val, i) => (
              <Log
                key={i}
                description={val.description}
                value={val.value}
                date={val.date}
                type={val.type}
                id={val._id}
                getLogs={getLogs}
              />
            ))
          )}
        </LogContainer>
        <TotalContainer>
          {entryLog.length === 0 ? (
            <div></div>
          ) : (
            <Total totalVal={total}>
              <div>
                <p>SALDO</p>
              </div>
              <div>
                <h2>{total}</h2>
              </div>
            </Total>
          )}
        </TotalContainer>
      </Container>
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

const Container = styled.div`
  width: 326px;
  height: 446px;
  background: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const LogContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  justify-content: flex-start;
  overflow-x: hidden;
  p {
    margin-top: 50%;
    width: 70%;
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

const TotalContainer = styled.div`
  width: 100%;
`;

const Total = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center !important;
  justify-content: space-between !important;
  background-color: #ffffff;
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
