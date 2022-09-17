import { FC, useState, useCallback, MouseEventHandler } from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import CreateButton from '../CreateButton';

import { useStore, UsersContextType } from '../../store';

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [newUser, setNewUser] = useState<string>('');

  const { activeUserId, users, dispatch } = useStore(
    'users',
  ) as UsersContextType;

  const handleToggle = useCallback(() => {
    setNewUser('');
    onToggle();
  }, [onToggle]);

  const handleSubmit = useCallback(() => {
    dispatch && dispatch({ type: 'add user', payload: newUser });
  }, [newUser, dispatch]);

  const handleUserClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      // @ts-ignore
      let { id } = e.target.dataset;

      if (id !== activeUserId) {
        dispatch && dispatch({ type: 'set active user', payload: id });
        handleToggle();
      }
    },
    [activeUserId, dispatch, handleToggle],
  );

  const handleDeleteUser: MouseEventHandler<HTMLAnchorElement> = useCallback(
    e => {
      // @ts-ignore
      const { id } = e.currentTarget.dataset;

      dispatch && dispatch({ type: 'delete user', payload: id });
    },
    [dispatch],
  );

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleToggle}>
      <Box sx={{ p: '20px 8px', width: '350px' }}>
        {users.map(({ id, name: username }) => (
          <ButtonGroup
            key={id}
            aria-label="outlined primary button group"
            variant="text"
            sx={{ mt: 1 }}
            fullWidth
          >
            <Button
              fullWidth
              data-id={id}
              onClick={handleUserClick}
              variant={id === activeUserId ? 'contained' : 'outlined'}
            >
              {username}
            </Button>
            <IconButton
              color="error"
              data-id={id}
              component={Link}
              onClick={handleDeleteUser}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </ButtonGroup>
        ))}
        <CreateButton
          placeholder="New user..."
          icon={<PersonAddAltIcon />}
          onChange={setNewUser}
          onSubmit={handleSubmit}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
