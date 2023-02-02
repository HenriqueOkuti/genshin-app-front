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

export function TasksEditMain({ setPageState, setTaskToMod, taskToMod, windowWidth }) {
  const [newTaskInfo, setNewTaskInfo] = useState({ ...taskToMod });
  const [newImage, setNewImage] = useState('');
  const [validImage, setValidImage] = useState('original');

  //console.log(newTaskInfo);
  //console.log(windowWidth);

  useEffect(async () => {
    if (newImage === '') {
      setValidImage('original');
      setNewTaskInfo({ ...newTaskInfo, image: taskToMod.image });
    }

    const urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    if (newImage && !newImage.match(urlRegex)) {
      setValidImage('invalid');
      setNewTaskInfo({ ...newTaskInfo, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
    }

    if (newImage !== taskToMod.image && newImage) {
      const imageIsValid = await verifyURL(newImage);
      if (imageIsValid) {
        setValidImage('valid');
        setNewTaskInfo({ ...newTaskInfo, image: newImage });
      }
    } else {
      setValidImage('original');
      setNewTaskInfo({ ...newTaskInfo, image: taskToMod.image });
    }
  }, [newImage]);

  const alterButtomsToColumn = windowWidth < 990 ? true : false;

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>Edit task</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'edit'} setPageState={setPageState} setTaskToMod={setTaskToMod} />
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
                key={taskToMod.name}
                defaultValue={taskToMod.name}
                disabled={false}
                id="outlined-required"
              />
              <ImageField>Image:</ImageField>
              <TextField
                onChange={(e) => setNewImage(e.target.value)}
                fullWidth
                disabled={false}
                key={taskToMod.image}
                defaultValue={taskToMod.image}
                id="outlined-required"
              />
            </InputColumn>
            <TaskInfoImage>
              <div>
                <img src={newTaskInfo.image} alt={newTaskInfo.name} />
              </div>
            </TaskInfoImage>
          </TaskEditInfoContainer>
          <RenderEditTaskItems items={newTaskInfo.items} taskId={newTaskInfo.id} />
          <EditButtonsContainer switchToColumn={alterButtomsToColumn}>
            <DeleteButton
              onClick={() => {
                const response = handleDelete();
                if (response) {
                  setTaskToMod(null);
                  setPageState('initial');
                }
              }}
            >
              Delete
            </DeleteButton>
            <UpdateButton
              onClick={() => {
                const response = handleUpdate();
                if (response) {
                  setTaskToMod(null);
                  setPageState('initial');
                }
              }}
            >
              Update
            </UpdateButton>
          </EditButtonsContainer>
        </TaskEditItemsContainer>
      </AuxContainer>
    </>
  );
}

export function TasksEditMobile({ setPageState, setTaskToMod, taskToMod }) {
  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>Edit task</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'edit'} setPageState={setPageState} setTaskToMod={setTaskToMod} />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
      </AuxContainer>
    </>
  );
}

function handleDelete() {
  toast('deleting task');
  return true;
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
