import { FC } from "react";
import styled from "styled-components";

import { CommonCalculatorItem } from "./common/commonStyle";
import { CalculatorItemView } from "../business/types";

//TODO: took out as common style common parts
const DisplayContainer = styled.div<{
  view: CalculatorItemView;
  hasBorder: boolean;
}>`
  ${CommonCalculatorItem}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 60px;
  box-shadow: ${({ hasBorder, view }) => {
    if (!hasBorder || view === "disable") {
      return "none ";
    }
  }};
  padding: 4px;
  /* 
  padding: ${({ hasBorder }) => {
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

const DisplayBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 4px 8px;
  gap: 10px;

  position: absolute;
  width: 232px;
  height: 52px;

  background: #f3f4f6;
  border-radius: 6px;
  box-sizing: border-box;

  font-family: "Inter";
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  /* identical to box height */

  display: flex;
  align-items: flex-end;
  text-align: right;

  /* gray/900 */

  color: #111827;
`;

export const Display: FC<{ view: CalculatorItemView; hasBorder: boolean }> = ({
  view,
  hasBorder,
}) => {
  return (
    <DisplayContainer view={view} hasBorder={hasBorder}>
      <DisplayBlock>0</DisplayBlock>
    </DisplayContainer>
  );
};
