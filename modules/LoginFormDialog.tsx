import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

const LoginFormDialog = ({open=false, handleClickOpen=()=>{}, handleClose=()=>{}})=>{

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={"inherit"}>Cancel</Button>
          <Button onClick={handleClose} color={"primary"}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LoginFormDialog;