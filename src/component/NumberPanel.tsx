import styled from "styled-components";

//TODO: took out as common style
const NumberPanelContainer = styled.div`
  width: 240px;
  /* height: 60px; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: 1fr 2fr; */
  padding: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  gap: 8px;
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

export const NumberPanel: any = () => {
  return (
    <NumberPanelContainer>
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
