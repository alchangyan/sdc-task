import { useCallback, useState, useMemo } from 'react';

// MUI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

// Components
import Sidebar from '../Sidebar';

// Helpers
import { stringAvatar } from '../../utils/helpers';

// Store
import useStore from '../../hooks/useStore';

const Header = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);

  const { activeUserId, users } = useStore();

  const toggleSidebar = useCallback(() => {
    setIsOpenSidebar(prevState => !prevState);
  }, []);

  const currentUserData = useMemo(() => {
    return users.find(({ id }) => activeUserId === id);
  }, [activeUserId, users]);

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
                <Avatar {...stringAvatar(currentUserData?.name || '')} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isOpenSidebar} onToggle={toggleSidebar} />
    </>
  );
};

export default Header;
