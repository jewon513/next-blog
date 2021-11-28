import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import useInput from "../../hooks/useInput";
import useLogin from "../../hooks/useLogin";

const LoginFormDialog = ({open=false, handleClose=()=>{}})=>{

  const [email, setEmail, onEmailChange] = useInput("");
  const [password, setPassword, onPasswordChange] = useInput("");
  const [loginState, login] = useLogin()

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={async(e)=>{
          e.preventDefault()
          await login({
            user_id: email,
            user_pw: password
          })
          handleClose()
          setEmail("")
          setPassword("")
        }}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="Email"
                type={"email"}
                label="Email"
                fullWidth
                variant="standard"
                onChange={onEmailChange}
                value={email}
            />
            <TextField
                margin="dense"
                id="Password"
                label="Password"
                fullWidth
                variant="standard"
                type={"password"}
                onChange={onPasswordChange}
                value={password}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color={"inherit"}>Cancel</Button>
            <Button type={"submit"} color={"primary"} disabled={loginState === "loading"}>Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default LoginFormDialog;