import styled from "styled-components";

//TODO: took out as common style
const EqualSignContainer = styled.div`
  width: 240px;
  height: 60px;
  display: flex;
  padding: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
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

export const EqualSign: any = () => {
  return (
    <EqualSignContainer>
      <EqualSignBlock>=</EqualSignBlock>
    </EqualSignContainer>
  );
};
