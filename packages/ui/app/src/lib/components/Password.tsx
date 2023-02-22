import copy from 'copy-to-clipboard';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { createRandomPassword } from '../utils/encryption';

export default function Password({
  password,
  setPassword
}: {
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <TextField
      required
      fullWidth
      name="password"
      label="Password"
      id="password"
      variant="filled"
      value={password}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              edge="start"
              color="primary"
              onClick={() => setPassword(createRandomPassword())}
            >
              <RefreshRounded />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" color="primary" onClick={() => copy(password)}>
              <Tooltip id="copyContent" title="Copy password">
                <ContentCopyIcon />
              </Tooltip>
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
}
