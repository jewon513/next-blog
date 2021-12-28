import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import useLogin from "../../hooks/useLogin";
import {useForm, Controller} from "react-hook-form";

const LoginFormDialog = ({open=false, handleClose=(args)=>{}})=>{

  const { handleSubmit, control, reset } = useForm()
  const [loginState, login] = useLogin()
  const onClose = ()=>{
    handleClose(reset)
  }
  const onSubmit = async (data) => {
    await login({...data})
    onClose()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <Controller
              defaultValue={""}
              name={"user_id"}
              control={control}
              rules={{
                required: true
              }}
              render={(props)=>{
                return (
                  <TextField
                    error={!!props.fieldState.error}
                    helperText={!!props.fieldState.error ? "Please enter your Email" : ''}
                    autoFocus
                    margin="dense"
                    type={"email"}
                    label="Email"
                    fullWidth
                    variant="standard"
                    autoComplete={"off"}
                    {...props.field}
                  />
                )
              }}
            />
            <Controller
              defaultValue={""}
              name={"user_pw"}
              control={control}
              rules={{
                required: true
              }}
              render={(props)=>{
                return (
                  <TextField
                    error={!!props.fieldState.error}
                    helperText={!!props.fieldState.error ? "Please enter your Password" : ''}
                    margin="dense"
                    type={"password"}
                    label="Password"
                    fullWidth
                    variant="standard"
                    autoComplete={"off"}
                    {...props.field}
                  />
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color={"inherit"}>Cancel</Button>
            <Button type={"submit"} color={"primary"} disabled={loginState === "loading"}>Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default LoginFormDialog;