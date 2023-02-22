import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function errorDialogBox({
  open,
  handleClose,
  content,
  showOkButton,
}: {
  open: boolean;
  content: string;
  handleClose: () => void;
  showOkButton: boolean;
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogContent>
        <Paper elevation={5} />
        <Alert severity="error">
          <AlertTitle>Error occurred</AlertTitle>
          {content}
        </Alert>
        <Paper />
      </DialogContent>
      <DialogActions>
        {showOkButton && (
          <Button onClick={handleClose} autoFocus>
            Ok
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
