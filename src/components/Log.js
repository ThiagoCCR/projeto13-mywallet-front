import styled from "styled-components";

export default function Log({ description, value, date, type }) {
  return (
    <Wrapper>
      <LogDescription>
        <h2>{date}</h2>
        <p>{description}</p>
      </LogDescription>
      <ValueText logType={type}>
        <p>{value}</p>
      </ValueText>
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
  width: 70%;
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
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  p {
    margin-top: 0px !important;
    font-family: Raleway !important;
    font-size: 16px !important;
    color: ${(props) => (props.logType === "income" ? "#03AC00" : "#C70000")} !important;
    font-weight: 400 !important;
  }
`;
