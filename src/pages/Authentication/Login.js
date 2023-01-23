import { TextField } from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContainer } from '../../layouts/AuthenticationContainer';
import { Background } from '../../layouts/Background';
import { Logo } from '../../layouts/Logo';
import {
  AuthenticationButtom,
  AuthenticationForms,
  AuthenticationFormsText,
  DividerLineContainer,
  DividerLogin,
  DividerText,
  LineDownSide,
  LineUpSide,
  OAuthButton,
  OAuthContainer,
  RedirectAuth,
  Subtitle,
  Title,
} from './AuthenticationSharedStyles';

export function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Background>
        <Logo />
      </Background>
      <AuthContainer>
        <Title>Login</Title>
        <Subtitle>Enter your credentials to access your account</Subtitle>
        <OAuthContainer>
          <OAuthButton onClick={() => console.log('Google Auth')}>
            <p>Google</p>
          </OAuthButton>
          <OAuthButton onClick={() => console.log('Github Auth')}>
            <p>Github</p>
          </OAuthButton>
        </OAuthContainer>
        <DividerLogin>
          <DividerLineContainer>
            <LineUpSide></LineUpSide>
            <LineDownSide></LineDownSide>
          </DividerLineContainer>
          <DividerText>or</DividerText>
          <DividerLineContainer>
            <LineUpSide></LineUpSide>
            <LineDownSide></LineDownSide>
          </DividerLineContainer>
        </DividerLogin>
        <LoginForms />
        <RedirectAuth>
          Not a member? <p onClick={() => navigate('/signup')}>Click here</p>
        </RedirectAuth>
      </AuthContainer>
    </>
  );
}

function LoginForms() {
  const [validInput, setValidInput] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);

  return (
    <div>
      <AuthenticationForms onSubmit={() => console.log('submitted')}>
        <div>
          <AuthenticationFormsText>Email</AuthenticationFormsText>
          <div>
            {validInput ? (
              <TextField fullWidth disabled={sendingRequest ? true : false} id="outlined-required" />
            ) : (
              <TextField fullWidth error id="outlined-disabled" helperText="Invalid credential" />
            )}
          </div>
        </div>
        <div>
          <AuthenticationFormsText>Password</AuthenticationFormsText>
          <div>
            {validInput ? (
              <TextField
                fullWidth
                disabled={sendingRequest ? true : false}
                id="outlined-password-input"
                type="password"
              />
            ) : (
              <TextField error fullWidth id="outlined-error-helper-text" helperText="Invalid credential" />
            )}
          </div>
        </div>
        <AuthenticationButtom onClick={() => console.log('Login')}>
          <p>Login</p>
        </AuthenticationButtom>
      </AuthenticationForms>
    </div>
  );
}
