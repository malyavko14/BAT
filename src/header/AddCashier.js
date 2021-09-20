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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';



export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <IconButton  onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавление кассира</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="full_name"
            label="ФИО"
            type="full_name"
            fullWidth
            variant="standard"
          />
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
            id="store_id"
            label="Код точки"
            type="store_id"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="passport_series"
            label="Серия паспорта"
            type="passport_series"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="passport_number"
            label="Номер паспорта"
            type="passport_number"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker 
            label="Date mobile"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
          <TextField
            autoFocus
            margin="dense"
            id="who_issued"
            label="Кем выдано"
            type="who_issued"
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
