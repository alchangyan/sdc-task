import { ColumnDataType } from '../types/global-types';
/**
 * Copied from MUI documentation for generation of random colors for active user icon.
 *
 * ##
 */
function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

/**
 * Also copied from MUI documentation with small modification to be able to use single word usernames.
 *
 * ##
 */

export function stringAvatar(name: string) {
  if (!name) return {};

  const splittedName = name.toUpperCase().split(' ');

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${splittedName[0][0]}${
      splittedName[1] ? splittedName[1][0] : ''
    }`,
  };
}

/**
 * Calculation of the column which was hovered while dragging a card.
 * "Null" will be returned if the column which is hovered is the initial column of the dragging card.
 *
 * ##
 */
export const getDestination = (
  columns: ColumnDataType[],
  e: globalThis.MouseEvent,
) => {
  const { pageX, pageY } = e;
  let destination = null;

  // @ts-ignore
  columns.forEach(({ status, ref }) => {
    const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = ref;

    if (
      pageX >= offsetLeft &&
      pageX <= offsetLeft + offsetWidth &&
      pageY >= offsetTop &&
      pageY <= offsetTop + offsetHeight
    ) {
      destination = status;
    }
  });

  return destination;
};
