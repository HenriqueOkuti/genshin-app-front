import { useEffect, useState } from 'react';
import {
  AuxContainer,
  CharactersHeader,
  CharactersHeaderButtons,
  CharactersList,
  LoaderContainer,
  SearchBarContainer,
} from './CharactersStyles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoAddCircleOutline } from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import { useTheme } from '../../../hooks/useTheme';
import { allImages } from '../../../utils/imageImporter';
import Loader from 'react-loader-spinner';

export function Characters() {
  const [pageState, setPageState] = useState('initial');
  const [suppText, setSuppText] = useState('');
  const [charactersToRender, setcharactersToRender] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const userTheme = useTheme();
  const [palette, setPalette] = useState(userTheme.palette);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const charactersImagesFace = allImages.imagesFace;
  const charactersImagesFull = allImages.imagesFull;

  console.log(palette);

  useEffect(() => {
    setPalette(userTheme.palette);

    if (pageState === 'initial') {
      setcharactersToRender(() => {
        const array = [];
        for (const [key, value] of Object.entries(charactersImagesFace)) {
          array.push(value);
        }
        return array;
      });
    } else {
      setcharactersToRender([]);
    }
  }, [updateList]);

  //Handles width of screen
  useEffect(() => {
    const handleResizeWindow = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const headerTexts = {
    initial: 'Characters',
    add: 'Add Character',
    edit: 'Edit Character',
  };

  //IoAddCircleOutline

  if (window.innerWidth > 700) {
    return (
      <>
        <AuxContainer>
          <CharactersHeader>
            <div>{headerTexts[pageState] + suppText}</div>
            <CharactersHeaderButtons>
              <div onClick={() => console.log('add character')}>
                <IoAddCircleOutline />
              </div>
              <div>
                <FilterMenu />
              </div>
            </CharactersHeaderButtons>
          </CharactersHeader>
          <SearchBarContainer>Searchbar</SearchBarContainer>
          {charactersToRender[0] ? (
            <CharactersList width={windowWidth}>{RenderImages(charactersToRender)}</CharactersList>
          ) : (
            <>
              <LoaderContainer>
                <div>
                  <Loader
                    height={120}
                    width={120}
                    color="#2d0103"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#907698"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                    type="Oval"
                  />
                </div>
              </LoaderContainer>
            </>
          )}
        </AuxContainer>
      </>
    );
  } else {
    return (
      <>
        <CharactersHeader>
          <div>{headerTexts[pageState] + suppText}</div>
          <div>
            <div>Add</div>
            <div>Order</div>
          </div>
        </CharactersHeader>
        <div>Mobile ver. of content</div>
      </>
    );
  }
}

function RenderImages(arrayImages) {
  return arrayImages.map((image, index) => {
    return (
      <>
        <img key={index} src={image} alt={`${index} img`} />
      </>
    );
  });
}

export default function FilterMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const userTheme = useTheme();
  const [palette, setPalette] = useState(userTheme.palette);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const CustomMenu = styled(Menu)(({ theme }) => ({
    color: '#ffffff',
    fontFamily: ['Inter'],

    div: {
      borderRadius: '20px',
    },
    ul: {
      backgroundColor: palette ? palette.hex6 : 'inherit',
      borderRadius: '20px',
    },
  }));

  const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: 'inherit',
    color: '#000000',
    fontFamily: ['Inter', 'arial'],
  }));

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ listbox: { backgroundColor: '#000000' }, color: '#000000', fontSize: 29, margin: 0, padding: 0 }}
        onClick={handleClick}
      >
        <IoAddCircleOutline />
      </Button>
      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: element');
          }}
        >
          Element
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: weapon');
          }}
        >
          Weapon
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: constellation');
          }}
        >
          Constellation
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: level');
          }}
        >
          Char Level
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: A-Z');
          }}
        >
          A-Z
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: Z-A');
          }}
        >
          Z-A
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: Friendship level');
          }}
        >
          Friendship
        </CustomMenuItem>
      </CustomMenu>
    </div>
  );
}
