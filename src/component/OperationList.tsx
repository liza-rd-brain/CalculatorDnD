import { FC } from "react";
import styled from "styled-components";

import { CommonCalculatorItem } from "./common/commonStyle";
import { CalculatorItemView } from "../business/types";

//TODO: took out as common style
const OperationListContainer = styled.div<{
  view: CalculatorItemView;
  hasBorder: boolean;
}>`
  ${CommonCalculatorItem}
  width: 240px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: ${({ hasBorder, view }) => {
    if (!hasBorder || view === "disable") {
      return "none ";
    }
  }};
  padding: 4px;
  /* padding: ${({ hasBorder }) => {
    if (hasBorder) {
      return "4px";
    }
  }}; */
  opacity: ${({ view }) => {
    if (view === "disable") {
      return "0.4 ";
    }
  }};
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

export const OperationList: FC<{
  view: CalculatorItemView;
  hasBorder: boolean;
}> = ({ view, hasBorder }) => {
  return (
    <OperationListContainer view={view} hasBorder={hasBorder}>
      <OperationItem>/</OperationItem>
      <OperationItem>х</OperationItem>
      <OperationItem>-</OperationItem>
      <OperationItem>+</OperationItem>
    </OperationListContainer>
  );
};
