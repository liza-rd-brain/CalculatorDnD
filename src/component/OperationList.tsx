import styled from "styled-components";

//TODO: took out as common style
const OperationListContainer = styled.div`
  width: 240px;
  height: 60px;
  display: flex;
  padding: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  gap: 10px;
`;

const OperationItem = styled.div`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 52px;
  height: 48px;

  background: #ffffff;
  border: 1px solid #e2e3e5;
  border-radius: 6px;
`;

export const OperationList: any = () => {
  return (
    <OperationListContainer>
      <OperationItem>/</OperationItem>
      <OperationItem>х</OperationItem>
      <OperationItem>-</OperationItem>
      <OperationItem>+</OperationItem>
    </OperationListContainer>
  );
};
