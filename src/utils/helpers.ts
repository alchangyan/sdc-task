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
