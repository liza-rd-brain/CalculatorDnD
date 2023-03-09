import { FC } from "react";
import styled from "styled-components";

import { CommonCalculatorItem } from "./common/commonStyle";
import { CalculatorItemView } from "../business/types";

//TODO: took out as common style
const NumberPanelContainer = styled.div<{
  view: CalculatorItemView;
  hasBorder: boolean;
}>`
  ${CommonCalculatorItem}
  width: 240px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  box-shadow: ${({ hasBorder, view }) => {
    if (!hasBorder || view === "disable") {
      return "none ";
    }
  }};
  padding: ${({ hasBorder }) => {
    if (hasBorder) {
      return "4px";
    }
  }};
  opacity: ${({ view }) => {
    if (view === "disable") {
      return "0.4 ";
    }
  }};
`;

const NumberPanelItem = styled.div`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  min-width: 72px;
  height: 48px;

  background: #ffffff;
  border: 1px solid #e2e3e5;
  border-radius: 6px;
  box-sizing: border-box;
  flex-grow: 2;

  &:last-child {
    grid-column: span 2;
  }
`;

export const NumberPanel: FC<{
  view: CalculatorItemView;
  hasBorder: boolean;
}> = ({ view, hasBorder }) => {
  return (
    <NumberPanelContainer view={view} hasBorder={hasBorder}>
      <NumberPanelItem>7</NumberPanelItem>
      <NumberPanelItem>8</NumberPanelItem>
      <NumberPanelItem>9</NumberPanelItem>
      <NumberPanelItem>4</NumberPanelItem>
      <NumberPanelItem>5</NumberPanelItem>
      <NumberPanelItem>6</NumberPanelItem>
      <NumberPanelItem>1</NumberPanelItem>
      <NumberPanelItem>2</NumberPanelItem>
      <NumberPanelItem>3</NumberPanelItem>
      <NumberPanelItem>0</NumberPanelItem>
      <NumberPanelItem>,</NumberPanelItem>
    </NumberPanelContainer>
  );
};
