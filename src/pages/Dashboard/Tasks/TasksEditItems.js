import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { ExcludeItemContainer, ItemContainer, ItemImage, ItemInfo } from './TasksStyles';
import { RiDeleteBack2Line } from 'react-icons/ri';
import NewItemModal from './TasksItemModal';

export function RenderEditTaskItems({ items, taskId }) {
  const [addItem, setAddItem] = useState(false);
  const [newItem, setNewItem] = useState({});

  return (
    <>
      <div>
        {items.map((item, index) => (
          <RenderTaskItem key={index} item={item} />
        ))}
      </div>
      <NewItemModal taskId={taskId} />
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
        <img src={'https://pbs.twimg.com/media/Eo4s9lHXUAARCt4.png'} alt={'item'} />
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
  toast('deleting item');
  //possible easier if async delete
}

function NewItemForms({ setNewItem, setAddItem }) {
  //to append item it's possibly easier if done async

  return (
    <>
      <div>
        <div>This is where you add a new item</div>
        <div onClick={() => setAddItem(false)}>cancel</div>
      </div>
    </>
  );
}
