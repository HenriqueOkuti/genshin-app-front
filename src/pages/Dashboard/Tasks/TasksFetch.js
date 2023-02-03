import { getAllItems, getUserTasks } from '../../../services/services';

export async function fetchUserTasks(userToken) {
  let allTasks = [];
  let token = userToken;

  if (!userToken) {
    token = localStorage.getItem('token');
  }

  const response = await getUserTasks(token);

  if (response.tasks) {
    return response.tasks;
  } else {
    return [];
  }
}

export async function fetchItems(userToken) {
  let token = userToken;
  if (!token) {
    token = localStorage.getItem('token');
  }

  const response = await getAllItems(token);
  if (!response.message) {
    localStorage.setItem('items', JSON.stringify(response));
  }
}

export function UseMockedTasks() {
  const fixedTasks = [];
  for (let i = 0; i < mockedTasks.length; i++) {
    const daysInfo = AddFullListOfDays(mockedTasks[i]);
    fixedTasks.push({
      ...mockedTasks[i],
      daysInfo: {
        text: daysInfo[0],
        listDays: daysInfo[1],
      },
    });
  }
  return fixedTasks;
}

function AddFullListOfDays(task) {
  const daysDict = {
    monday: ['Monday', 'Thursday', 'Sunday'],
    tuesday: ['Tuesday', 'Friday', 'Sunday'],
    wednesday: ['Wednesday', 'Saturday', 'Sunday'],
  };
  const daysOrderDict = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  const orderDaysDict = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  };
  const daysUsed = {};
  const items = task.items;

  for (let i = 0; i < items.length; i++) {
    if (items[i].itemInfo.day) {
      daysUsed[items[i].itemInfo.day] = true;
    }
  }

  if (!daysUsed['monday'] && !daysUsed['tuesday'] && !daysUsed['wednesday']) {
    return ['Any', [1, 2, 3, 4, 5, 6, 7]];
  }

  const daysUsedArray = [];
  const daysUsedDict = {};

  for (const [key, value] of Object.entries(daysUsed)) {
    for (let i = 0; i < daysDict[key].length; i++) {
      if (!daysUsedDict[daysDict[key][i]]) {
        daysUsedDict[daysDict[key][i]] = true;
        daysUsedArray.push(daysDict[key][i]);
      }
    }
  }

  const daysUsedNumber = [];

  for (let i = 0; i < daysUsedArray.length; i++) {
    daysUsedNumber.push(daysOrderDict[daysUsedArray[i]]);
  }
  daysUsedNumber.sort((a, b) => a - b);

  const daysUsedInOrder = [];
  for (let i = 0; i < daysUsedNumber.length; i++) {
    daysUsedInOrder.push(orderDaysDict[daysUsedNumber[i]]);
  }

  return [daysUsedInOrder.join(', '), daysUsedNumber];
}

const mockedTask1 = {
  userTaskId: 1,
  userId: 1,
  taskId: 1,
  name: 'Task 1',
  createdAt: new Date(),
  updatedAt: new Date(),
  image: 'https://variety.com/wp-content/uploads/2022/09/Genshin-Impact-Anime-Series-Concept.png?w=681&h=383&crop=1',
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
        rarity: 3,
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
  ],
};

const mockedTask2 = {
  userTaskId: 2,
  userId: 1,
  taskId: 3,
  name: 'Task 2',
  createdAt: new Date(),
  updatedAt: new Date(),
  image: 'https://sm.ign.com/ign_br/screenshot/default/genshin-impact-2023-01-06-23-018_anms.jpg',
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
  ],
};

const mockedTask3 = {
  userTaskId: 3,
  userId: 1,
  taskId: 8,
  name: 'Task 3',
  createdAt: new Date(),
  updatedAt: new Date(),
  image: 'https://p2.trrsf.com/image/fget/cf/800/450/middle/images.terra.com/2022/09/30/1942793008-i634908.jpeg',
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
  ],
};

const mockedTask4 = {
  userTaskId: 4,
  userId: 1,
  taskId: 50,
  name: 'Task 4',
  createdAt: new Date(),
  updatedAt: new Date(),
  image:
    'https://images.ctfassets.net/vfkpgemp7ek3/67qu4uSDKte20MTDw52IxR/1819c75ae8859a4fb3dc2dc37d24db79/genshin-impact-surpasses-3-billion.jpg',
  items: [
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: true,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 10,
      quantity: 10,
      itemInfo: {
        name: 'dungeon mat 1',
        class: 'class',
        rarity: 2,
        key: 'dungeon_mat1',
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
      dungeonMat: true,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 20,
      quantity: 10,
      itemInfo: {
        name: 'dungeon mat 2',
        class: 'class',
        rarity: 2,
        key: 'dungeon_mat2',
        image: 'image',
        day: 'tuesday',
        dungeonId: 1,
        weaponMat: false,
        characterMat: true,
      },
    },
    {
      weeklyBossMat: false,
      bossMat: false,
      dungeonMat: true,
      enemyMat: false,
      localSpecialty: false,
      weaponMat: false,
      itemId: 30,
      quantity: 10,
      itemInfo: {
        name: 'dungeon mat 3',
        class: 'class',
        rarity: 2,
        key: 'dungeon_mat3',
        image: 'image',
        day: 'wednesday',
        dungeonId: 1,
        weaponMat: false,
        characterMat: true,
      },
    },
  ],
};

const mockedTasks = [{ ...mockedTask1 }, { ...mockedTask2 }, { ...mockedTask3 }, { ...mockedTask4 }];
