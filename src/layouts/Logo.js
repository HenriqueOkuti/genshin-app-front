import styled from 'styled-components';

export function Logo() {
  return (
    <>
      <LogoContainer>
        <div>Genshin Task Manager</div>
        <p>Less time planning. More time playing.</p>
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

  div {
    font-family: 'Iceberg', arial;
    font-size: 48px;
    text-align: center;
    text-decoration: underline;
  }

  p {
    margin-top: 20px;
    font-family: 'Inter', arial;
    font-size: 18px;
    text-align: center;
  }
`;
