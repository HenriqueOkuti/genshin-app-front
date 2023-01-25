import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  PageContainer,
  DashboardContainer,
  SideMenuContainer,
  MainMenuContainer,
  ContentContainer,
} from '../../layouts/layouts';
import { MobileContentContainer, MobilePageContainer } from '../../layouts/Dashboard/DashboardMobile';
import { SideMenu, MobileMenu } from '../../components/components';
import { useTheme } from '../../hooks/useTheme';
import useToken from '../../hooks/useToken';
import { getUser } from '../../services/services';

export function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userTheme = useTheme();
  const [token, setToken] = useState(useToken());
  const [theme, setTheme] = useState(userTheme);
  const [update, setUpdate] = useState(false);
  const [userData, setUserData] = useState({
    id: 0,
    name: 'Username',
    email: 'default@mail.com',
    image: 'https://d16u9y6cg00afk.cloudfront.net/Genshin_Impact_Official_Chibi/966410.512.webp',
  });

  if (!token) {
    setToken(localStorage.getItem('token'));
  }

  useEffect(() => {
    setTheme(userTheme);
  }, [update]);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    if (token) {
      const response = await getUser(token);
      if (response.id) {
        setUserData(response);
      }
    }
  }, [token]);

  //Handles width of screen
  useEffect(() => {
    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  if (windowWidth > 700) {
    return (
      <PageContainer>
        <DashboardContainer>
          <SideMenuContainer colors={theme.palette}>
            <SideMenu update={update} setUpdate={setUpdate} userData={userData} />
          </SideMenuContainer>
          <MainMenuContainer colors={theme.palette}>
            <ContentContainer>
              <Outlet />
            </ContentContainer>
          </MainMenuContainer>
        </DashboardContainer>
      </PageContainer>
    );
  }

  return (
    <>
      <MobilePageContainer>
        <MobileMenu
          update={update}
          setUpdate={setUpdate}
          colors={theme.palette}
          userData={userData}
          theme={theme}
          setTheme={setTheme}
        />
        <MobileContentContainer colors={theme.palette}>
          <Outlet />
        </MobileContentContainer>
      </MobilePageContainer>
    </>
  );
}
