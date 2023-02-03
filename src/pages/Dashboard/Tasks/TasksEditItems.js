import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { ExcludeItemContainer, ItemContainer, ItemImage, ItemInfo } from './TasksStyles';
import { RiDeleteBack2Line } from 'react-icons/ri';
import NewItemModal from './TasksItemModal';
import { imagesItems } from '../../../utils/itemsImageImporter';

export function RenderEditTaskItems({ items, taskId, setNewTaskInfo, newTaskInfo }) {
  const [addItem, setAddItem] = useState(false);
  const [newItem, setNewItem] = useState({});

  return (
    <>
      <div>
        {items.map((item, index) => (
          <RenderTaskItem key={index} item={item} />
        ))}
      </div>
      <NewItemModal newTaskInfo={newTaskInfo} setNewTaskInfo={setNewTaskInfo} taskId={taskId} />
    </>
  );
}

function RenderTaskItem({ item }) {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];
  const [quantity, setQuantity] = useState(item.quantity);

  //console.log(userTheme);
  //console.log(item);

  const rarityDict = {
    1: '#8B949F',
    2: '#82CD47',
    3: '#8DBFE0',
    4: '#a8a0db',
    5: '#F6D860',
  };

  return (
    <ItemContainer colors={userTheme.palette}>
      <ItemImage colors={rarityDict[item.itemInfo.rarity]}>
        <img src={imagesItems[item.itemInfo.key]} alt={'item'} />
      </ItemImage>
      <ItemInfo>
        <div>{item.itemInfo.name}</div>
        <div>
          <div>Quantity:</div>
          <input
            onChange={(e) => {
              const value = +e.target.value;
              if (value > 0 && value <= 9999) {
                setQuantity(value);
              } else {
                toast('Insert a correct value (max: 9999)');
              }
            }}
            defaultValue={quantity}
            type="number"
            min="1"
            max="9999"
          />
        </div>
      </ItemInfo>
      <ExcludeItemContainer>
        <div onClick={() => handleDeleteItem(item)}>
          <RiDeleteBack2Line />
        </div>
      </ExcludeItemContainer>
    </ItemContainer>
  );
}

function handleDeleteItem(item) {
  //console.log('deleting item');
  toast('Deleting item');
  //possible easier if async delete
}
