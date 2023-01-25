import { Avatar } from '@material-ui/core';
import { MobileHeader } from '../../../layouts/Dashboard/DashboardMobile';
import {
  ButtonsContainer,
  ButtonText,
  ExitContainer,
  ThemesContainer,
  UserContainer,
} from '../SideMenu/SideMenuStyles';
import { MobileUserContainer } from './MenuMobileStyles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useSetTheme } from '../../../hooks/useTheme';
import { DefaultThemes } from '../../../assets/themes/Themes';

export function MobileMenu({ update, setUpdate, colors, userData, theme, setTheme }) {
  const navigate = useNavigate();
  const modifyTheme = useSetTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MobileHeader colors={colors}>
        <MobileUserContainer>
          <Avatar alt={userData.name} src={userData.image} onClick={() => navigate('/dashboard/profile')} />
        </MobileUserContainer>
        <div>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ listbox: { backgroundColor: '#000000' }, color: '#000000', width: 120 }}
          >
            Mobile Menu
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <ButtonsContainer>
              <Button
                onClick={() => {
                  navigate('/dashboard/home');
                  handleClose();
                }}
              >
                <ButtonText>Home</ButtonText>
              </Button>
              <Button
                onClick={() => {
                  navigate('/dashboard/profile');
                  handleClose();
                }}
              >
                <ButtonText>Profile</ButtonText>
              </Button>
              <Button
                onClick={() => {
                  navigate('/dashboard/characters');
                  handleClose();
                }}
              >
                <ButtonText>Characters</ButtonText>
              </Button>
              <Button
                onClick={() => {
                  navigate('/dashboard/backpack');
                  handleClose();
                }}
              >
                <ButtonText>Backpack</ButtonText>
              </Button>
              <Button
                onClick={() => {
                  navigate('/dashboard/tasks');
                  handleClose();
                }}
              >
                <ButtonText>Todo List</ButtonText>
              </Button>
            </ButtonsContainer>
            <ThemesContainer
              onClick={() => {
                alterTheme(theme, modifyTheme, setTheme, setUpdate, update);
                //handleClose();
              }}
            >
              <Avatar alt={theme.name} src={theme.image} />
            </ThemesContainer>
            <ExitContainer>
              <Button
                onClick={() => {
                  logout(navigate);
                  handleClose();
                }}
              >
                <p>Exit</p>
              </Button>
            </ExitContainer>
          </Menu>
        </div>
      </MobileHeader>
    </>
  );
}

async function alterTheme(theme, modifyTheme, setTheme, setUpdate, update) {
  const len = DefaultThemes.length;
  //console.log(theme.id);
  const newIndex = theme.id >= len ? 0 : theme.id;
  const newTheme = DefaultThemes[newIndex];

  localStorage.setItem('theme', JSON.stringify(newTheme));
  modifyTheme(newTheme);
  setTheme(newTheme);
  setUpdate(!update);

  return;
}

function logout(navigate) {
  localStorage.removeItem('token');
  navigate('/login');
}
