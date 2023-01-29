import styled from 'styled-components';

export const AuxContainer = styled.div`
  height: 100%;
  overflow-y: hidden;
  padding-top: 10px;
  margin: 0 5% 5% 5%;
`;

export const CharactersHeader = styled.div`
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

export const CharactersHeaderButtons = styled.div`
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

export const AddCharacterButton = styled.div`
  margin-right: 20px;
`;

export const SearchBarContainer = styled.div`
  background-color: red;
`;

export const CharactersList = styled.div`
  display: grid;

  grid-template-columns: repeat(${(props) => (props.width ? Math.floor(props.width / 275) : 3)}, 1fr);
  justify-items: center;
  align-items: center;

  gap: 10px;

  height: 80%;
  overflow-y: scroll;

  > img {
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
`;

export const CharacterCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Inter, arial;

  padding: 10px;

  border: 1px solid black;
  border-radius: 5px;
`;

export const CardName = styled.div`
  width: 100%;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #1f3265;
  border-radius: 15px;
  text-align: center;
  color: #ffffff;
  padding: 5px 0 5px 0;

  margin-bottom: 5px;
`;

export const CardImage = styled.div`
  img {
    background-color: ${(props) => (props.color ? props.color : '#d95538')};
    border-radius: 100%;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const DropdownAnchor = styled.div`
  position: relative;

  > div {
    margin-left: 20px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;

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
