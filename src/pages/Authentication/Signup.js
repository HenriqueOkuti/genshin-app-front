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
  RedirectAuth,
  Subtitle,
  Title,
} from './AuthenticationSharedStyles';

export function SignUp() {
  const [validInput, setValidInput] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Background>
        <Logo />
      </Background>
      <AuthContainer>
        <Title>Sign up</Title>
        <Subtitle>Enter your credentials to create your account</Subtitle>
        <div>
          <AuthenticationForms>
            <div>
              <AuthenticationFormsText>Name</AuthenticationFormsText>
              <div>
                <TextField fullWidth disabled={sendingRequest ? true : false} />
              </div>
            </div>
            <div>
              <AuthenticationFormsText>Email</AuthenticationFormsText>
              <div>
                <TextField fullWidth disabled={sendingRequest ? true : false} />
              </div>
            </div>
            <div>
              <AuthenticationFormsText>Password</AuthenticationFormsText>
              <div>
                {' '}
                <TextField fullWidth disabled={sendingRequest ? true : false} type="password" />
              </div>
            </div>
            <div>
              <AuthenticationFormsText>Confirm Password</AuthenticationFormsText>
              <div>
                {' '}
                <TextField fullWidth disabled={sendingRequest ? true : false} type="password" />
              </div>
            </div>
          </AuthenticationForms>
        </div>
        <AuthenticationButtom onClick={() => console.log('Register')}>
          <p>Register</p>
        </AuthenticationButtom>
        <RedirectAuth>
          Already a member? <p onClick={() => navigate('/login')}>Click here</p>
        </RedirectAuth>
      </AuthContainer>
    </>
  );
}
