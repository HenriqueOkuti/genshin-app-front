import styled from 'styled-components';

export const Background = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;

  background-color: ${(props) => (props.colors ? props.colors.hex3 : '#66527B')};
  z-index: -1;
`;
