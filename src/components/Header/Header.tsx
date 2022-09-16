import { FC, useState, useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import { stringToColor } from '../../utils/helpers';
import { useStore } from '../../store';

const Header: FC<{}> = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const { currentUser, users, dispatch } = useStore('users');
  console.log(currentUser, users);

  const toggleSidebar = useCallback(() => {
    setIsOpenSidebar(prevState => !prevState);
    dispatch && dispatch({ type: 'test' });
  }, [dispatch]);

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Kanban Board
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Switch User">
              <IconButton onClick={toggleSidebar} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: stringToColor('name') }}>N</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isOpenSidebar} onClose={toggleSidebar}>
        <Box sx={{ p: '20px 8px' }}>
          <Button sx={{ mt: 1 }} variant="outlined" fullWidth>
            John Doe
          </Button>
          <Button sx={{ mt: 1 }} variant="outlined" fullWidth>
            John Doe
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
