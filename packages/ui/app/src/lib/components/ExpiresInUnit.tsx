import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { dtos } from '@ots-share/model';

export default function ExpiresInUnit() {
  return (
    <Select
      id="expiresInUnit"
      defaultValue={dtos.RecordExpirationUnitEnum.hours}
      name="expiresInUnit"
    >
      {
        // @ts-ignore
        <MenuItem value={dtos.RecordExpirationUnitEnum.minutes}>
          {dtos.RecordExpirationUnitEnum.minutes}
        </MenuItem>
      }
      {
        // @ts-ignore
        <MenuItem value={dtos.RecordExpirationUnitEnum.hours}>
          {dtos.RecordExpirationUnitEnum.hours}
        </MenuItem>
      }
    </Select>
  );
}
