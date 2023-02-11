import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadScreen({ open, content='Please wait . . .' }: { open: boolean, content?: string }) {
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" gap={1} sx={{ m: 1 }}>
                <CircularProgress sx={{ color: 'primary.main' }} />
                <Typography component="h1" variant="h5">
                  {content}
                </Typography>
              </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
