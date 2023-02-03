import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteTask } from '../../../services/services';
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

export function TasksEditMain({ setPageState, setTaskToMod, taskToMod, windowWidth, token }) {
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
          <RenderEditTaskItems
            newTaskInfo={newTaskInfo}
            setNewTaskInfo={setNewTaskInfo}
            items={newTaskInfo.items}
            taskId={newTaskInfo.id}
          />
          <EditButtonsContainer switchToColumn={alterButtomsToColumn}>
            <DeleteButton
              onClick={() => {
                const response = handleDelete(token, taskToMod);
                if (response) {
                  setTaskToMod(null);
                  localStorage.removeItem('items');
                  setPageState('initial');
                }
              }}
            >
              Delete
            </DeleteButton>
            <UpdateButton
              onClick={() => {
                const response = handleUpdate(token, taskToMod, newTaskInfo);
                if (response) {
                  //setTaskToMod(null);
                  //setPageState('initial');
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
        <div>Soon™</div>
      </AuxContainer>
    </>
  );
}

async function handleDelete(token, task) {
  const response = await deleteTask(token, task.id);

  if (response === 'OK') {
    toast('Deleted task');
    return true;
  } else {
    return false;
  }
}

async function handleUpdate(token, oldTask, newTask) {
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
