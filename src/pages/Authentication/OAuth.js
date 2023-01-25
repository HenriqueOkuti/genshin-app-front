import { useNavigate } from 'react-router-dom';
import { AuthContainer, Background, Logo } from '../../layouts/layouts';
import { OAuthLoader, Subtitle, Title } from './AuthenticationSharedStyles';
import qs from 'query-string';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export function OAuth() {
  const navigate = useNavigate();
  const { code } = qs.parseUrl(window.location.href).query;
  const [token, setToken] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [update]);

  if (token) {
    navigate('/dashboard/home');
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

        <OAuthLoader>
          <p>Loading</p>
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="success" />
          </Box>
          <p>Just finishing a few touches</p>
        </OAuthLoader>
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
