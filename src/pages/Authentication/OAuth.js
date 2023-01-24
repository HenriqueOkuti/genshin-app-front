import { useNavigate } from 'react-router-dom';
import { AuthContainer } from '../../layouts/AuthenticationContainer';
import { Background } from '../../layouts/Background';
import { Logo } from '../../layouts/Logo';
import { Subtitle, Title } from './AuthenticationSharedStyles';
import qs from 'query-string';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function OAuth() {
  const navigate = useNavigate();
  const { code } = qs.parseUrl(window.location.href).query;
  const [token, setToken] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [update]);

  if (token) {
    navigate('/dashboard');
  }

  if (!code) {
    navigate('/login');
  }

  useEffect(() => {
    if (code) {
      fetchUserInfo(code, setUpdate, update);
    }
  }, []);

  return (
    <>
      <Background>
        <Logo />
      </Background>
      <AuthContainer>
        <Title>Login</Title>
        <Subtitle>Just a quick second</Subtitle>
      </AuthContainer>
    </>
  );
}

async function fetchUserInfo(code, setUpdate, update) {
  const response = await axios.post('http://localhost:4000/auth/github', { githubCode: code }, {});
  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token);
    setUpdate(!update);
  }
}
