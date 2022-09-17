import { StoreType, SettersType, DataItemType } from '../../types/global-types';

type PayloadType = {
  columnStatus: any;
  description: string;
}
export const addCard = (
  store: StoreType,
  { setData }: SettersType,
  {columnStatus, description}: PayloadType,
) => {
  const newData = [...store.data];
  const newCard: DataItemType = {
    id: String(Date.now()),
    type: 'card',
    status: columnStatus,
    description,
    user: store.activeUserId as string,
  }

  newData.push(newCard);

  localStorage.setItem('data', JSON.stringify(newData));

  setData(newData);
};
