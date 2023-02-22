import TextField from '@mui/material/TextField';

export default function ExpiresInValue() {
  return (
    <TextField
                required
                fullWidth
                type="number"
                defaultValue="1"
                name="expiresInValue"
                label="Expires In"
                id="expiresInValue"
              />
  )
}