import styled from "styled-components";
import { deleteLogFromAPI } from "../services/myWallet";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Log({ description, value, date, type, id, getLogs }) {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  function deleteLog() {
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    if (window.confirm("Tem certeza que deseja excluir esse registro?")) {
      deleteLogFromAPI(id, config)
        .then(() => {
          navigate("/home");
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
        });
      getLogs(userData.token);
    }
  }

  return (
    <Wrapper>
      <LogDescription>
        <h2>{date}</h2>
        <p>{description}</p>
      </LogDescription>
      <ValueText logType={type}>
        <p>{value}</p>
      </ValueText>
      <div onClick={() => deleteLog()}>
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const LogDescription = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  h2 {
    font-family: Raleway !important;
    font-size: 16px !important;
    color: #c6c6c6 !important;
    font-weight: 400 !important;
  }
  p {
    font-family: Raleway !important;
    font-size: 16px !important;
    color: #000000 !important;
    font-weight: 400 !important;
    margin-top: 0px !important;
  }
`;

const ValueText = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  p {
    margin-top: 0px !important;
    font-family: Raleway !important;
    font-size: 16px !important;
    color: ${(props) =>
      props.logType === "income" ? "#03AC00" : "#C70000"} !important;
    font-weight: 400 !important;
  }
`;
