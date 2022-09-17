import React, {
  FC,
  useState,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from 'react';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import CloseIcon from '@mui/icons-material/Close';

type CreateButtonProps = {
  icon: ReactNode;
  placeholder: string;
  onChange: (trimmedValue: string) => void;
  onSubmit: () => void;
};

const CreateButton: FC<CreateButtonProps> = ({
  icon,
  placeholder,
  onChange,
  onSubmit,
}) => {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleUsernameInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    e => {
      const value = e.target.value.trim();

      setValue(value);
      onChange(value);
    },
    [onChange],
  );

  const toggleInputVisibility = useCallback(() => {
    setIsInputVisible(prevState => !prevState);
  }, []);

  const hideInput = useCallback(() => {
    setIsInputVisible(false);
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (e.code === 'Enter' && !!value) {
        hideInput();
        onSubmit();
      }
    },
    [hideInput, value, onSubmit],
  );

  const handleClickAway = useCallback(() => {
    setValue('');
    hideInput();
  }, [hideInput]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <IconButton
          color="primary"
          component={Link}
          onClick={toggleInputVisibility}
        >
          {isInputVisible ? <CloseIcon /> : icon}
        </IconButton>
        {isInputVisible && (
          <TextField
            variant="outlined"
            placeholder={placeholder}
            sx={{ mt: 1 }}
            size="small"
            fullWidth
            helperText='press "Enter" to submit'
            onKeyDown={handleKeyDown}
            onChange={handleUsernameInputChange}
            autoFocus
          />
        )}
      </div>
    </ClickAwayListener>
  );
};

export default CreateButton;
