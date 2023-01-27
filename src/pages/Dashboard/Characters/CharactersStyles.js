import styled from 'styled-components';

export const AuxContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
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
    width: 64px;
  }
`;

export const SearchBarContainer = styled.div`
  background-color: red;
`;

export const CharactersList = styled.div`
  display: grid;

  grid-template-columns: repeat(${(props) => (props.width ? Math.floor(props.width / 250) : 3)}, 1fr);
  justify-items: center;
  align-items: center;

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
