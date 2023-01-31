import styled from 'styled-components';

export const AuxContainer = styled.div`
  position: relative;
  height: 95%;

  overflow-y: scroll;

  margin: 0 5% 0 5%;
`;

export const TasksHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 45px;

  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;

  color: #000000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TasksHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 45px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Inter', arial;
    font-style: normal;
    font-weight: 400;
    font-size: 29px;
    line-height: 29px;
    display: flex;
    align-items: center;
  }
`;

export const DropdownAnchor = styled.div`
  position: relative;
  z-index: 1;

  > div {
    margin-left: 20px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  z-index: 500;

  top: 20px;
  right: 0px;

  width: 180px;
  height: auto;

  display: flex;
  flex-direction: column;

  background-color: #ffffff;

  border-radius: 15px;

  div {
    font-size: 24px;
    height: 40px;
  }
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-start;

  margin: 15px 0 5% 0;
  height: 100%;
  overflow-y: scroll;

  > img {
  }
`;

//
//
//
