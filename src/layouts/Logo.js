import styled from 'styled-components';

export function Logo() {
  return (
    <>
      <LogoContainer>
        <div>Logo</div>
        <div>Less time planning. More time playing.</div>
      </LogoContainer>
    </>
  );
}

const LogoContainer = styled.div`
  margin-left: 50%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
