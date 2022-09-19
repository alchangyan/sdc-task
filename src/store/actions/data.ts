import type {
  StoreType,
  SettersType,
  DataItemType,
  ColumnStatusType,
} from '../../types/global-types';

type AddCardPayloadType = {
  columnStatus: ColumnStatusType;
  description: string;
};

/**
 * All the action contain almost the same arguments:
 * - store (contains whole store as I found that I have to delete all the cards of particular user if it is removed);
 * - setters (all the setters are stored as one piece for the same reason as store);
 * - data (optionali argument whic contains any data passed by dipatch function. Dispatch function can be found here: "src/hooks/useStore.ts").
 *
 * ##
 */
export const addCard = (
  store: StoreType,
  { setData }: SettersType,
  { columnStatus, description }: AddCardPayloadType,
) => {
  const newData = [...store.data];
  /**
   * Creation of the card and adding it to the current store with updating of global one (local storage).
   * I tried to follow the instruction and avoid any initial data structure changes, but I found that I am not able to handle cards without having their IDs.
   *
   * At the very beginnig I had a different structure for the cards:
   * {
   *   [userId]: [
   *     {
   *       [card data]
   *     },
   *     ...
   *   ]
   * }
   *
   * I found this easier to handle data based on the user, but then I checked initial requirements, so I came to current solution.
   *
   * ##
   */
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

/**
 * Updating card placement based on the column that was dragged chosen as new card location.
 *
 * ##
 */

export const moveCard = (
  store: StoreType,
  { setData }: SettersType,
  data: any,
) => {
  const { cardId, newStatus } = data;

  /**
   * Timeout was added due to delays in updating the store.
   * I tried to remove this as I don't like to have it here, but I have not enough time at this moment, so I'll do it later for myself.
   *
   * ##
   */
  setTimeout(() => {
    /**
     * Dragging card destination column will always be as null until it will be moved to different column.
     *
     * ##
     */
    if (newStatus) {
      const newData = [...store.data];

      const indexOfCurrentCard = newData.findIndex(({ id }) => id === cardId);

      /**
       * I found simple solution for moving cards to save some time.
       * To avoid calculations of cards those are in the column we chose to add a new card from another column, I am adding the card to the very top of the array, so it will be shown as first in the column just by changing the status of the card.
       * I wish I had more time not to avoid it :)
       *
       * ##
       */
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
