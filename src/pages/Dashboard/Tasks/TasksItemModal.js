import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  AddItemButtom,
  Dropdown,
  DropdownAnchor,
  ModalContainer,
  ModalHeader,
  TasksHeaderButtons,
} from './TasksStyles';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { IoAddCircleOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';

export default function NewItemModal({ taskId }) {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //console.log();
  //THIS IS WHERE I NEED TO FETCH ITEMS FROM THE API

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <AddItemButtom theme={userTheme.palette}>
        <Button onClick={handleOpen}>
          <IoAddCircleOutline />
        </Button>
      </AddItemButtom>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer theme={userTheme.palette}>
          <Box sx={style}>
            <ModalHeader>
              <div onClick={handleClose}>Pick an item</div>
              <TasksHeaderButtons>
                <div>
                  <FilterMenuItemsModal />
                </div>
              </TasksHeaderButtons>
            </ModalHeader>
            <div>
              <div>Item 1</div>
              <div>Item 1</div>
              <div>Item 1</div>
              <div>Item 1</div>
            </div>
          </Box>
        </ModalContainer>
      </Modal>
    </div>
  );
}

export function FilterMenuItemsModal() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filterOptions = [
    {
      name: 'Filter option 1',
      function: () => {
        console.log('filter');
      },
    },
    {
      name: 'Filter option 2',
      function: () => {
        console.log('filter');
      },
    },
    {
      name: 'Filter option 3',
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
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];

  return (
    <>
      <Dropdown theme={userTheme.palette}>
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
