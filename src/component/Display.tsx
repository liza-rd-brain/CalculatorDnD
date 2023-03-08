import styled from "styled-components";

//TODO: took out as common style
const DisplayContainer = styled.div`
  width: 240px;
  height: 60px;
  display: flex;
  padding: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
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

export const Display: any = () => {
  return (
    <DisplayContainer>
      <DisplayBlock>0</DisplayBlock>
    </DisplayContainer>
  );
};
