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
        <DialogTitle>Добавление пользователя</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="user"
            label="Пользователь"
            type="user"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="standard"
          />
          <FormControl sx={{ marginTop: 1, minWidth: 560 }}>
        <InputLabel id="demo-simple-select-helper-label">Статус</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          //value={age}
          //label="Age"
          //onChange={handleChange}
        >
          <MenuItem value={10}>TMR</MenuItem>
          <MenuItem value={20}>Moder</MenuItem>
          <MenuItem value={30}>Admin</MenuItem>
        </Select>
      </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Телефон"
            type="phone"
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
