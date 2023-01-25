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

export function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userTheme = useTheme();
  const [theme, setTheme] = useState(userTheme);
  const [update, setUpdate] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Username',
    image: 'https://d16u9y6cg00afk.cloudfront.net/Genshin_Impact_Official_Chibi/966410.512.webp',
  });

  useEffect(() => {
    setTheme(userTheme);
  }, [update]);

  //console.log(theme);

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
