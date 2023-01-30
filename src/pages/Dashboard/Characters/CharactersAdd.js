import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { createDoubleLinkedList, handleFilter } from './CharactersFilter';
import { HandleRedirectButton } from './CharactersRedirect';
import { AddRenderImages } from './CharactersRenderList';
import {
  AuxContainer,
  CharactersHeader,
  CharactersHeaderButtons,
  CharactersList,
  Dropdown,
  DropdownAnchor,
} from './CharactersStyles';

//main version
export function CharAddMain({ elements, weapons, setPageState, windowWidth, missingChars, setCharToAdd }) {
  const [filterType, setFilterType] = useState({ name: null });
  const [updatedFilter, setUpdatedFilter] = useState(false);
  const [suppText, setSuppText] = useState('');
  const [filteredChars, setFilteredChars] = useState([...missingChars]);

  useEffect(() => {
    if (missingChars[0]) {
      handleFilter(filterType, [...missingChars], setFilteredChars, setSuppText);
    }
  }, [updatedFilter]);

  return (
    <>
      <AuxContainer>
        <CharactersHeader>
          <div>Add Characters {suppText}</div>
          <CharactersHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'add'} setPageState={setPageState} />
            </div>
            <div>
              <FilterMenuAdd
                setFilterType={setFilterType}
                filterType={filterType}
                setUpdatedFilter={setUpdatedFilter}
                updatedFilter={updatedFilter}
                elements={elements}
                weapons={weapons}
              />
            </div>
          </CharactersHeaderButtons>
        </CharactersHeader>
        <CharactersList width={windowWidth}>
          <AddRenderImages
            arrayChars={!filterType.name ? missingChars : filteredChars}
            elements={elements}
            setPageState={setPageState}
            setCharToAdd={setCharToAdd}
          />
        </CharactersList>
      </AuxContainer>
    </>
  );
}

//mobile version
export function CharAddMobile() {
  return (
    <>
      <div>Add mobile</div>
    </>
  );
}

export function FilterMenuAdd({ setUpdatedFilter, updatedFilter, setFilterType, filterType, elements, weapons }) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  const weaponList = createDoubleLinkedList(weapons);
  const elementList = createDoubleLinkedList(elements);

  const filterCharsOptions = [
    {
      name: 'Element',
      function: () => {
        if (!filterType.name || filterType.name !== 'Element') {
          setFilterType({ name: 'Element', type: elementList.head });
        } else if (!filterType.type || !filterType.type?.next) {
          setFilterType({ name: null });
        } else if (filterType.name === 'Element' && !filterType.type.next) {
          setFilterType({ name: 'null' });
        } else if (filterType.name === 'Element') {
          setFilterType({ name: 'Element', type: filterType.type.next });
        }
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'Weapon',
      function: () => {
        if (!filterType.name || filterType.name !== 'Weapon') {
          setFilterType({ name: 'Weapon', type: weaponList.head });
        } else if (!filterType.type || !filterType.type?.next) {
          setFilterType({ name: null });
        } else if (filterType.name === 'Weapon' && !filterType.type.next) {
          setFilterType({ name: 'null' });
        } else if (filterType.name === 'Weapon') {
          setFilterType({ name: 'Weapon', type: filterType.type.next });
        }
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'A-Z',
      function: () => {
        filterType.name === 'A-Z' ? setFilterType({ name: null }) : setFilterType({ name: 'A-Z' });
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'Z-A',
      function: () => {
        filterType.name === 'Z-A' ? setFilterType({ name: null }) : setFilterType({ name: 'Z-A' });
        setUpdatedFilter(!updatedFilter);
      },
    },
  ];

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
        {filterOptions.map((filter, index) => {
          return (
            <div
              key={index}
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
