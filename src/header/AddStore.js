import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton  onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавление точки</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="store_code"
            label="Код точки"
            type="store_code"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="store_number"
            label="Название точки"
            type="store_number"
            fullWidth
            variant="standard"
          />
          <FormControl sx={{ marginTop: 1, minWidth: 560 }}>
        <InputLabel id="demo-simple-select-helper-label">VC</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          //value={age}
          //label="Age"
          //onChange={handleChange}
        >
          <MenuItem value={1}>TMR</MenuItem>
          <MenuItem value={2}>Moder</MenuItem>
          <MenuItem value={3}>Admin</MenuItem>
          <MenuItem value={4}>TMR</MenuItem>
          <MenuItem value={5}>Moder</MenuItem>
          <MenuItem value={6}>Admin</MenuItem>
          <MenuItem value={7}>TMR</MenuItem>
          <MenuItem value={8}>Moder</MenuItem>
          <MenuItem value={9}>Admin</MenuItem>
        </Select>
      </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="BU"
            label="BU"
            type="BU"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="territory"
            label="Территория"
            type="territory"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Добавить</Button>
          <Button onClick={handleClose}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
