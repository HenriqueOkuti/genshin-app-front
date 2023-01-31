import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { AuxContainer, Dropdown, DropdownAnchor, TasksHeader, TasksHeaderButtons, TasksList } from './TasksStyles';

export function TasksInitialMain({ userTasks }) {
  const [filterType, setFilterType] = useState({ name: null });
  const [updatedFilter, setUpdatedFilter] = useState(false);
  const [suppText, setSuppText] = useState('');
  const [filteredChars, setFilteredChars] = useState([...userTasks]);

  console.log(userTasks);

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>User tasks</div>
          <TasksHeaderButtons>
            <div>Add</div>
            <div>
              <FilterMenuInitial />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
        <TasksList>
          <TasksList />
        </TasksList>
      </AuxContainer>
    </>
  );
}

export function TasksInitialMobile() {
  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>User tasks mobile</div>
          <TasksHeaderButtons>
            <div>Add</div>
            <div>
              <FilterMenuInitial />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
      </AuxContainer>
    </>
  );
}

export function FilterMenuInitial() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filterOptions = [
    {
      name: 'Filter option',
      function: () => {
        console.log('filter');
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
            <FilterMenuDropdown handleOpen={handleOpen} filterOptions={filterOptions} />
          </DropdownAnchor>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );

  //
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
