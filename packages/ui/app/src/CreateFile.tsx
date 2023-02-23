import { useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import copy from 'copy-to-clipboard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { dtos, models } from '@ots-share/model';

import { encrypt, createRandomPassword } from './lib/utils/encryption';
import { buildUrlToShare, RecordTypesEnum } from './lib/utils/url';
import { post } from './lib/utils/api';
import {
  readFileContent,
  validateFile,
  getPretteryMaxFileSizeMessage,
  getPretteryMinFileSizeMessage,
} from './lib/utils/file';

import LoadScreen from './lib/components/LoadScreen';
import ErrorDialog from './lib/components/ErrorDialog';
import Password from './lib/components/Password';
import ExpiresInValue from './lib/components/ExpiresInValue';
import ExpiresInUnit from './lib/components/ExpiresInUnit';

const title = 'Create One-time secret share - for a small file';
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export default function CreateFile() {
  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      onDrop: (files: File[]) => {
        const { error } = validateFile(files[0]);
        setFileErrorMessage(error);
      },
    });
  const [password, setPassword] = useState(createRandomPassword());
  const [fileErrorMessage, setFileErrorMessage] = useState<string | undefined>(undefined);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [isSuccessRequest, setIsSuccessRequest] = useState(true);
  const [contentForModal, setContentForModal] = useState('');
  const [showLoadModal, setShowLoadModal] = useState(false);
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const file = acceptedFiles[0];

  useEffect(() => {
    document.title = title;
  }, []);

  const handleClickOpen = () => {
    setOpenDialogBox(true);
  };

  const handleClose = () => {
    if (isSuccessRequest) {
      window.location.reload();
    }

    setOpenDialogBox(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isValid, error } = validateFile(file);

    if (!isValid) {
      setFileErrorMessage(error);
      return;
    }

    setShowLoadModal(true);

    const data = new FormData(event.currentTarget);

    const password = data.get('password') as string;
    const expiresInValue = parseInt(data.get('expiresInValue') as string, 10);
    const expiresInUnit = data.get('expiresInUnit') as dtos.RecordExpirationUnitEnum;

    readFileContent(file as File)
      .then((content) => {
        return post('record', {
          content: encrypt(content, password),
          expireIn: {
            value: expiresInValue,
            unit: expiresInUnit,
          },
        });
      })
      .then((response: { message?: string } & models.IRecord) => {
        setShowLoadModal(false);

        if (response.message) {
          setIsSuccessRequest(false);
          setContentForModal(response.message);
        } else {
          setIsSuccessRequest(true);
          setContentForModal(
            buildUrlToShare({
              domain: window.location.origin,
              response,
              password,
              type: RecordTypesEnum.file,
              fileName: file?.name,
            })
          );
        }

        handleClickOpen();
      })
      .catch((error: Error) => {
        setIsSuccessRequest(false);
        setContentForModal(error.message);
      });
  };

  return (
    <Container>
      <LoadScreen open={showLoadModal} />

      <Box
        sx={{
          marginTop: 8,
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ m: 1 }}>
                <LockOutlinedIcon sx={{ color: 'primary.main' }} />
                <Typography component="h1" variant="h5">
                  {title}
                </Typography>
                <Chip label={getPretteryMinFileSizeMessage()} color="primary" variant="outlined" />
                <Chip
                  label={getPretteryMaxFileSizeMessage()}
                  color="secondary"
                  variant="outlined"
                />
              </Stack>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Box {...getRootProps({ style: style as any })}>
                <input name="fileUploads" {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </Box>
            </Grid>
            {file && (
              <Grid item xs={12}>
                <Stack
                  gap={1}
                  sx={{ m: 1 }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chip label={`File: ${file?.name}`} color="primary" variant="outlined" />
                </Stack>
              </Grid>
            )}
            {fileErrorMessage && (
              <Grid item xs={12}>
                <Stack
                  gap={1}
                  sx={{ m: 1 }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Chip label={fileErrorMessage} color="error" variant="outlined" />
                </Stack>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Password password={password} setPassword={setPassword} />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <ExpiresInValue />
            </Grid>
            <Grid item xs={6}>
              <ExpiresInUnit />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <DialogBox
        success={isSuccessRequest}
        open={openDialogBox}
        handleClose={handleClose}
        content={contentForModal}
      />
    </Container>
  );
}

function DialogBox({
  success,
  open,
  handleClose,
  content,
}: {
  success: boolean;
  open: boolean;
  content: string;
  handleClose: () => void;
}) {
  if (success) {
    return successDialogBox({ open, handleClose, content });
  }

  return ErrorDialog({ open, handleClose, content, showOkButton: true });
}

function successDialogBox({
  open,
  handleClose,
  content,
}: {
  open: boolean;
  content: string;
  handleClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth={true}
      maxWidth={'lg'}
      disableEscapeKeyDown
    >
      <DialogTitle>{'Your Url'}</DialogTitle>
      <DialogContent>
        <Paper elevation={5}>
          <TextField
            autoFocus
            required
            fullWidth={true}
            name="createdUrl"
            label="send this url to the other party"
            id="createdUrl"
            variant="filled"
            value={content}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip id="copyUrl" title="Copy Url">
                    <IconButton edge="end" color="primary" onClick={() => copy(content)}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
