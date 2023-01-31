import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import useToken from '../../../hooks/useToken';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { TasksAddMain, TasksAddMobile } from './TasksAdd';
import { TasksEditMain, TasksEditMobile } from './TasksEdit';
import { TasksInitialMain, TasksInitialMobile } from './TasksInitial';

export function TasksManager() {
  const userTheme = useTheme();
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [pageState, setPageState] = useState('initial');
  const [userTasks, setUserTasks] = useState([]);

  const [taskToMod, setTaskToMod] = useState(null);

  useEffect(() => {
    //fetches user tasks
    setUserTasks([...mockedTasks]);
  }, []);

  useEffect(() => {
    //Handles width of screen
    useWindowWidth(setWindowWidth);
  }, []);

  useEffect(() => {
    if (taskToMod) {
      setPageState('edit');
    }
  }, [taskToMod]);

  console.log(userTasks);

  if (window.innerWidth > 700) {
    //Render main version
    if (pageState === 'initial') {
      //Render all user tasks
      return <TasksInitialMain userTasks={userTasks} />;
    }
    if (pageState === 'add') {
      //Render all user tasks
      return <TasksAddMain />;
    }
    if (pageState === 'edit') {
      //Render all user tasks
      return <TasksEditMain />;
    }
  } else {
    //Render mobile version
    if (pageState === 'initial') {
      //Render all user tasks
      return <TasksInitialMobile />;
    }
    if (pageState === 'add') {
      //Render all user tasks
      return <TasksAddMobile />;
    }
    if (pageState === 'edit') {
      //Render all user tasks
      return <TasksEditMobile />;
    }
  }
}

const mockedTask1 = {
  userTaskId: 1,
  userId: 1,
  taskId: 1,
  name: 'Task 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  items: [
    {
      weeklyBossMat: true,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 1,
      quantity: 10,
      itemInfo: {
        name: 'weekly boss mat',
        image: 'image',
        key: 'weekly_boss_mat',
        rarity: 5,
      },
    },
    {
      weeklyBossMat: false,
      bossMat: true,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 2,
      quantity: 10,
      itemInfo: {
        name: 'boss mat',
        image: 'image',
        key: 'boss_mat',
        rarity: 4,
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: true,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 3,
      quantity: 10,
      itemInfo: {
        name: 'dungeon mat',
        class: 'class',
        rarity: 2,
        key: 'dungeon_mat',
        image: 'image',
        day: 'monday',
        dungeonId: 1,
        weaponMat: false,
        characterMat: true,
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: true,
      localSpecialty: false,
      weaponMat: false,
      itemId: 4,
      quantity: 10,
      itemInfo: {
        name: 'enemy mat',
        rarity: 1,
        key: 'enemy_mat',
        image: 'image',
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: true,
      weaponMat: false,
      itemId: 5,
      quantity: 10,
      itemInfo: {
        name: 'local specialty',
        rarity: 1,
        key: 'local_specialty',
        image: 'image',
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 6,
      quantity: 10,
      itemInfo: null,
    },
  ],
};

const mockedTask2 = {
  userTaskId: 2,
  userId: 1,
  taskId: 3,
  name: 'Task 2',
  createdAt: new Date(),
  updatedAt: new Date(),
  items: [
    {
      weeklyBossMat: true,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 1,
      quantity: 10,
      itemInfo: {
        name: 'weekly boss mat',
        image: 'image',
        key: 'weekly_boss_mat',
        rarity: 5,
      },
    },
    {
      weeklyBossMat: false,
      bossMat: true,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 2,
      quantity: 10,
      itemInfo: {
        name: 'boss mat',
        image: 'image',
        key: 'boss_mat',
        rarity: 4,
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: true,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 3,
      quantity: 10,
      itemInfo: {
        name: 'dungeon mat',
        class: 'class',
        rarity: 2,
        key: 'dungeon_mat',
        image: 'image',
        day: 'monday',
        dungeonId: 1,
        weaponMat: false,
        characterMat: true,
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: true,
      localSpecialty: false,
      weaponMat: false,
      itemId: 4,
      quantity: 10,
      itemInfo: {
        name: 'enemy mat',
        rarity: 1,
        key: 'enemy_mat',
        image: 'image',
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: true,
      weaponMat: false,
      itemId: 5,
      quantity: 10,
      itemInfo: {
        name: 'local specialty',
        rarity: 1,
        key: 'local_specialty',
        image: 'image',
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: false,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 6,
      quantity: 10,
      itemInfo: null,
    },
  ],
};

const mockedTasks = [{ ...mockedTask1 }, { ...mockedTask2 }];
