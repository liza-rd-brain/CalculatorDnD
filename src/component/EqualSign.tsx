import { FC } from "react";
import styled from "styled-components";

import { CommonCalculatorItem } from "./common/commonStyle";
import { CalculatorItemView } from "../business/types";

//TODO: took out as common style
const EqualSignContainer = styled.div<{
  view: CalculatorItemView;
  hasBorder: boolean;
}>`
  ${CommonCalculatorItem}
  width: 240px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const EqualSignBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;

  position: absolute;
  width: 232px;
  height: 52px;

  background: #5d5fef;
  border-radius: 6px;
  box-sizing: border-box;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  /* identical to box height, or 107% */

  text-align: center;

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const EqualSign: FC<{
  view: CalculatorItemView;
  hasBorder: boolean;
}> = ({ view, hasBorder }) => {
  return (
    <EqualSignContainer view={view} hasBorder={hasBorder}>
      <EqualSignBlock>=</EqualSignBlock>
    </EqualSignContainer>
  );
};
