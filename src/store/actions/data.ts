import { StoreType, SettersType, DataItemType } from '../../types/global-types';

type AddCardPayloadType = {
  columnStatus: any;
  description: string;
};

export const addCard = (
  store: StoreType,
  { setData }: SettersType,
  { columnStatus, description }: AddCardPayloadType,
) => {
  const newData = [...store.data];
  const newCard: DataItemType = {
    id: String(Date.now()),
    type: 'card',
    status: columnStatus,
    description,
    user: store.activeUserId as string,
  };

  newData.push(newCard);

  localStorage.setItem('data', JSON.stringify(newData));

  setData(newData);
};

export const moveCard = (
  store: StoreType,
  { setData }: SettersType,
  data: any,
) => {
  const { cardId, newStatus } = data;

  setTimeout(() => {
    if (newStatus) {
      const newData = [...store.data];

      const indexOfCurrentCard = newData.findIndex(({ id }) => id === cardId);

      newData.unshift({
        ...newData[indexOfCurrentCard],
        status: newStatus,
      });

      newData.splice(indexOfCurrentCard + 1, 1);

      localStorage.setItem('data', JSON.stringify(newData));
      setData(newData);
    }
  }, 0);
};
