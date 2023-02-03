import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RenderEditTaskItems } from './TasksEditItems';
import { HandleRedirectButton } from './TasksRedirect';
import {
  AuxContainer,
  DeleteButton,
  EditButtonsContainer,
  ImageField,
  InputColumn,
  NameField,
  TaskEditInfoContainer,
  TaskEditItemsContainer,
  TaskInfoImage,
  TasksHeader,
  TasksHeaderButtons,
  UpdateButton,
} from './TasksStyles';

export function TasksAddMain({ setPageState, windowWidth }) {
  const [newImage, setNewImage] = useState('');
  const [validImage, setValidImage] = useState('original');
  const [newTaskInfo, setNewTaskInfo] = useState({
    name: '',
    image: 'https://pbs.twimg.com/media/Er6UozSXUAET7n5.png',
    items: [],
  });

  //console.log(newTaskInfo);

  useEffect(async () => {
    if (newImage === '') {
      setValidImage('original');
      setNewTaskInfo({ ...newTaskInfo, image: 'https://pbs.twimg.com/media/Er6UozSXUAET7n5.png' });
    }

    const urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    if (newImage && !newImage.match(urlRegex)) {
      setValidImage('invalid');
      setNewTaskInfo({ ...newTaskInfo, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
    }

    if (newImage !== '' && newImage) {
      const imageIsValid = await verifyURL(newImage);
      if (imageIsValid) {
        setValidImage('valid');
        setNewTaskInfo({ ...newTaskInfo, image: newImage });
      }
    } else {
      setValidImage('original');
      setNewTaskInfo({ ...newTaskInfo, image: 'https://pbs.twimg.com/media/Er6UozSXUAET7n5.png' });
    }
  }, [newImage]);

  const alterButtomsToColumn = windowWidth < 990 ? true : false;

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>Add task</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'add'} setPageState={setPageState} />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
        <TaskEditItemsContainer>
          <TaskEditInfoContainer>
            <InputColumn>
              <NameField>Name:</NameField>
              <TextField
                onChange={(e) => setNewTaskInfo({ ...newTaskInfo, name: e.target.value })}
                fullWidth
                defaultValue={newTaskInfo.name}
                disabled={false}
                id="outlined-required"
              />
              <ImageField>Image:</ImageField>
              <TextField
                onChange={(e) => setNewImage(e.target.value)}
                fullWidth
                disabled={false}
                defaultValue={newTaskInfo.image}
                id="outlined-required"
              />
            </InputColumn>
            <TaskInfoImage>
              <div>
                <img src={newTaskInfo.image} alt={newTaskInfo.name} />
              </div>
            </TaskInfoImage>
          </TaskEditInfoContainer>
          <RenderEditTaskItems
            newTaskInfo={newTaskInfo}
            setNewTaskInfo={setNewTaskInfo}
            items={newTaskInfo.items}
            taskId={newTaskInfo.id}
          />
          <EditButtonsContainer switchToColumn={alterButtomsToColumn}>
            <UpdateButton
              onClick={() => {
                const response = handleUpdate();
                if (response) {
                  setPageState('initial');
                }
              }}
            >
              Create
            </UpdateButton>
          </EditButtonsContainer>
        </TaskEditItemsContainer>
      </AuxContainer>
    </>
  );
}

export function TasksAddMobile() {
  return (
    <>
      <div>Add task mobile</div>
    </>
  );
}

function handleUpdate() {
  toast('updating task');
  return true;
}

async function verifyURL(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}
