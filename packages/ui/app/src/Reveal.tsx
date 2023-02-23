import { useState, useEffect } from 'react';

import copy from 'copy-to-clipboard';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LockOpenOutlined from '@mui/icons-material/LockOpenOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';

import { models } from '@ots-share/model';

import { decrypt } from './lib/utils/encryption';
import { get } from './lib/utils/api';
import { parseAndExtractUrl, parsedPathType, RecordTypesEnum } from './lib/utils/url';

import LoadScreen from './lib/components/LoadScreen';
import ErrorDialog from './lib/components/ErrorDialog';

const title = 'View One-time secret';

export default function Reveal() {
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [content, setContent] = useState('');
  const [errorContent, setErrorContent] = useState('');
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [viewContentOpen, setViewContentOpen] = useState(false);
  const [showFetchContentButton, setShowFetchContentButton] = useState(true);
  const [fileData, setFileData] = useState<{ data: string; name: string }>();
  const [isFile, setIsFile] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveFile = (fileName: string, content: string) => {
    const a = document.createElement('a');
    a.download = fileName;
    a.href = content;
    a.click();
  };

  const showError = (message: string) => {
    setShowFetchContentButton(false);
    setShowLoadModal(false);
    setOpenErrorModal(true);
    setContent('');
    setErrorContent(message);
  };

  const handleUrl = (url: string) => {
    setIsText(false);
    setIsFile(false);

    const parsedResults = parseAndExtractUrl(url);

    if (!parsedResults) {
      showError('Unable to parse the given URL.');
    } else {
      handleFetchUrl(parsedResults);
    }
  };

  const handleFetchUrl = ({
    id,
    password,
    type = RecordTypesEnum.text,
    fileName = 'unknown.txt',
  }: parsedPathType) => {
    setIsText(false);
    setIsFile(false);
    setShowLoadModal(true);

    get(`record/${id}`)
      .then((data: { message?: string } & models.IRecord) => {
        setShowFetchContentButton(false);
        setShowLoadModal(false);

        if (data.message) {
          showError(data.message);
        } else {
          const decryptedText = decrypt(data.content, password);

          if (decryptedText) {
            if (type === RecordTypesEnum.file) {
              setIsFile(true);
              setFileData({
                data: decryptedText,
                name: fileName,
              });
            } else {
              setIsText(true);
              setContent(decryptedText);
            }
          } else {
            showError('Unable to decrypt the content');
          }
        }
      })
      .catch((error: Error) => {
        showError(error.message);
      });
  };

  return (
    <Container>
      <LoadScreen open={showLoadModal} />
      <Box
        sx={{
          marginTop: 8,
          flexDirection: 'column',
          alignItems: 'let',
        }}
      >
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ m: 1 }}>
                <LockOpenOutlined sx={{ color: 'primary.main' }} />
                <Typography component="h1" variant="h5">
                  {title}
                </Typography>
              </Stack>
            </Grid>
            {isText && (
              <Grid item xs={6} alignItems="flex-end" justifyContent="flex-end" display="flex">
                <IconButton edge="end" color="primary" onClick={() => copy(content)}>
                  <Tooltip id="copyContent" title="Copy content">
                    <ContentCopyIcon />
                  </Tooltip>
                </IconButton>
              </Grid>
            )}
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              {showFetchContentButton && (
                <Button variant="contained" onClick={() => handleUrl(window.location.href)}>
                  Fetch content
                </Button>
              )}
              {!openErrorModal && !showFetchContentButton && isText && (
                <Accordion
                  expanded={viewContentOpen}
                  onClick={() => setViewContentOpen(!viewContentOpen)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Click here to view the content</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper elevation={5}>
                      <TextField
                        autoFocus
                        required
                        fullWidth
                        multiline
                        value={content}
                        name="content"
                        variant="filled"
                        label="Secret content"
                        id="content"
                        InputProps={{
                          rows: 20,
                          readOnly: true,
                        }}
                      />
                    </Paper>
                  </AccordionDetails>
                </Accordion>
              )}
              {!openErrorModal && !showFetchContentButton && isFile && (
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<DownloadIcon />}
                  onClick={() => {
                    if (fileData) {
                      saveFile(fileData.name, fileData.data);
                    }
                  }}
                >
                  Click here to download the file
                </Button>
              )}
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Box>
      </Box>
      <ErrorDialog
        open={openErrorModal}
        handleClose={() => {}}
        content={errorContent}
        showOkButton={false}
      />
    </Container>
  );
}
