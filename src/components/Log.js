import styled from "styled-components";
import { deleteLogFromAPI } from "../services/myWallet";
import { useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function Log({ description, value, date, type, id, getLogs }) {
  const userData = JSON.parse(localStorage.getItem("USER"));
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
          getLogs(userData.token);
          navigate("/home");
        })
        .catch((err) => {
          console.log(err.message);
          alert(err.message);
        });
    }
  }

  return (
    <Wrapper>
      <LogDescription>
        <h2>{date}</h2>
        <p>{description}</p>
      </LogDescription>
      <Teste>
        <ValueText logType={type}>
          <p>{value}</p>
        </ValueText>
        <IconContainer onClick={() => deleteLog()}>
          <IconContext.Provider
            value={{
              color: "#C6C6C6",
              className: "global-class-name",
              size: "20px",
            }}
          >
            <div>
              <IoCloseSharp />
            </div>
          </IconContext.Provider>
        </IconContainer>
      </Teste>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const LogDescription = styled.div`
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
    margin-left: 15px;
  }
`;

const Teste = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 60px;
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0px;
  top: 5px;
`;

const ValueText = styled.div`
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
