import { useEffect, useRef, useState } from 'react';
import {
  AddCharacterButton,
  AuxContainer,
  CardImage,
  CardInfo,
  CardName,
  CharacterCard,
  CharactersHeader,
  CharactersHeaderButtons,
  CharactersList,
  Dropdown,
  DropdownAnchor,
  LoaderContainer,
  SearchBarContainer,
} from './CharactersStyles';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useTheme } from '../../../hooks/useTheme';
import { allImages } from '../../../utils/imageImporter';
import Loader from 'react-loader-spinner';
import { CustomFilterMenu, CustomMenuFilter } from '../../../assets/frameworkAssets/mui/muiComponents';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { AiOutlineMenu } from 'react-icons/ai';
import useToken from '../../../hooks/useToken';
import {
  getAllCharacters,
  getAllElements,
  getAllWeapons,
  getUserCharacters,
} from '../../../services/Characters/getCharactersAPI';

export function Characters() {
  const userTheme = useTheme();
  const token = useToken();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [pageState, setPageState] = useState('initial');
  const [suppText, setSuppText] = useState('');

  const [charactersToRender, setCharactersToRender] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const [userCharacters, setUserCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [missingCharacters, setMissingCharacters] = useState([]);

  const [elements, setElements] = useState([]);
  const [weapons, setWeapons] = useState([]);

  const charactersImagesFace = allImages.imagesFace;
  const charactersImagesFull = allImages.imagesFull;

  //console.log(charactersImagesFace);

  //Handles width of screen
  useEffect(() => {
    useWindowWidth(setWindowWidth);
  }, []);

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    if (!token) {
      console.log('token not loaded yet');
    }

    let response; //will be used to store the response for each API request

    response = await getAllElements(token);
    if (response.elements) {
      setElements(response.elements);
    }

    const elementsDict = {};
    for (let i = 0; i < elements.length; i++) {
      elementsDict[elements[i].id] = elements[i].name;
    }

    response = await getAllWeapons(token);
    if (response.weapons) {
      setWeapons(response.weapon);
    }

    //Fetches all characters
    response = await getAllCharacters(token);
    if (response.characters) {
      //
      const characters = response.characters.map((char) => {
        const charKey = char.name.toLowerCase().replace(' ', '_').replace(')', '').replace('(', '');

        return {
          ...char,
          imageFace: charactersImagesFace[charKey],
          imageSplashArt: charactersImagesFull[charKey],
          elementName: elementsDict[char.elementId],
        };
      });

      //console.log(charactersImagesFace);
      console.log(characters);
      setAllCharacters(characters);
    }

    //Fetches user characters
    response = await getUserCharacters(token);
    if (response.characters) {
      const characters = response.characters.map((char) => {
        const charKey = char.name.toLowerCase().replace(' ', '_').replace(')', '').replace('(', '');
        return {
          ...char,
          imageFace: charactersImagesFace[charKey],
          imageSplashArt: charactersImagesFull[charKey],
          elementName: elementsDict[char.elementId],
        };
      });

      setUserCharacters(characters);
    }

    //console.log('should filter missing chars?');
    if (userCharacters && allCharacters && userCharacters[0]) {
      //console.log('user has chars');
    } else {
      //console.log('user has no chars');
      setPageState('add');
      setMissingCharacters(allCharacters);
    }

    setUpdateList(!updateList);

    if (!allCharacters[0] || !allCharacters[0].elementName) {
      setFetchAgain(!fetchAgain);
    }
  }, [fetchAgain]);

  useEffect(() => {
    if (pageState === 'initial') {
      setCharactersToRender(userCharacters);
    } else if (pageState === 'add') {
      setCharactersToRender(missingCharacters);
    } else {
      setCharactersToRender([]);
    }
  }, [updateList]);

  //console.log(charactersToRender);

  const headerTexts = {
    initial: 'Characters',
    add: 'Add Character',
    adding: 'Add Character',
    edit: 'Edit Character',
    filtered: 'Characters:',
  };

  //console.log(charactersToRender);
  //console.log(elements);

  //IoAddCircleOutline

  if (window.innerWidth > 700) {
    return (
      <>
        <AuxContainer>
          <CharactersHeader>
            <div>{headerTexts[pageState] + suppText}</div>
            <CharactersHeaderButtons>
              <AddCharacterButton onClick={() => console.log('add character')}>
                <IoAddCircleOutline />
              </AddCharacterButton>
              <div>
                <FilterMenuButtom />
              </div>
            </CharactersHeaderButtons>
          </CharactersHeader>
          {/* <SearchBarContainer>Searchbar</SearchBarContainer> */}
          {charactersToRender[0] ? (
            <CharactersList width={windowWidth}>{RenderImages(charactersToRender, pageState)}</CharactersList>
          ) : (
            <LoadingContent />
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

function LoadingContent() {
  const [hex, setHex] = useState('#907698');

  const getRanHex = (size) => {
    let result = [];
    let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHex('#' + getRanHex(6));
    }, 1500);
  }, []);

  return (
    <>
      <LoaderContainer>
        <div>
          <Loader
            height={120}
            width={120}
            color={hex}
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor={hex}
            strokeWidth={2}
            strokeWidthSecondary={2}
            type="Oval"
          />
        </div>
      </LoaderContainer>
    </>
  );
}

function RenderImages(arrayChars, pageState) {
  const possibleColors = ['#d95538', '#C3CEE7', '#DCB37B', '#8C6CC4', '#88a054', '#4CB88F', '#9FE8C2'];

  //console.log(arrayChars);

  const elementColors = {
    anemo: '#6ec5b1',
    cryo: '#9fd7e4',
    dendro: '#a6c938',
    electro: '#a98bc6',
    geo: '#f9b62d',
    hydro: '#4cc3f6',
    pyro: '#ec7e24',
  };

  return arrayChars.map((char, index) => {
    //console.log(char);
    //console.log(char.elementName);

    return (
      <>
        <CharacterCard
          onClick={() => {
            //
            console.log('Redirect to CHAR info');
          }}
        >
          <CardName>{char.name}</CardName>
          <CardImage color={elementColors[char.elementName]}>
            <img src={char.imageFace} alt={`${index} img`} />
          </CardImage>
          {pageState === 'add' ? (
            <></>
          ) : (
            <CardInfo>
              <div>Lvl {90}</div>
              <div>Friendship {10}</div>
            </CardInfo>
          )}
        </CharacterCard>
      </>
    );
  });
}

export function FilterMenuButtom() {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  //useOutsideAlerter(wrapperRef, setOpen, open);
  const filterAllCharsOptions = [
    {
      name: 'Element',
      function: () => {
        console.log('Element');
        //handleOpen();
      },
    },
    {
      name: 'Weapon',
      function: () => {
        console.log('Weapon');
      },
    },
    {
      name: 'A-Z',
      function: () => {
        console.log('A-Z');
      },
    },
    {
      name: 'Z-A',
      function: () => {
        console.log('Z-A');
      },
    },
  ];
  const filterCharsOptions = [
    {
      name: 'Element',
      function: () => {
        console.log('Element');
      },
    },
    {
      name: 'Weapon',
      function: () => {
        console.log('Weapon');
      },
    },
    {
      name: 'Constellation',
      function: () => {
        console.log('Constellation');
      },
    },
    {
      name: 'Level',
      function: () => {
        console.log('Level');
      },
    },
    {
      name: 'A-Z',
      function: () => {
        console.log('A-Z');
      },
    },
    {
      name: 'Z-A',
      function: () => {
        console.log('Z-A');
      },
    },
    {
      name: 'Friendship',
      function: () => {
        console.log('Friendship');
      },
    },
  ];
  //['Element', 'Weapon', 'Constellation', 'Level', 'A-Z', 'Z-A', 'Friendship'];

  //filter variables
  const [filterType, setFilterType] = useState(null);

  const filterChars = {
    element: false,
    weapon: false,
    constellation: false,
    level: false,
    orderAZ: false,
    orderZA: false,
    friendship: false,
  };

  const filterAllChars = {
    element: false,
    weapon: false,
    orderAZ: false,
    orderZA: false,
  };
  //

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, open]);

  return (
    <>
      <div>
        <div onClick={handleOpen}>
          <AiOutlineMenu />
        </div>
        {open ? (
          <DropdownAnchor ref={wrapperRef}>
            <FilterMenuDropdown handleOpen={handleOpen} filterOptions={filterCharsOptions} />
          </DropdownAnchor>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export function FilterMenuDropdown({ filterOptions }) {
  return (
    <>
      <Dropdown>
        {filterOptions.map((filter) => {
          return (
            <div
              onClick={() => {
                //handleOpen();
                filter.function();
              }}
            >
              <p>{filter.name}</p>
            </div>
          );
        })}
      </Dropdown>
    </>
  );
}

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('clicked outside');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
