import {Box, Grid, IconButton, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import useDialog from "../hooks/useDialog";
import LoginFormDialog from "./dialog/LoginFormDialog";

const Footer = ()=>{

  const [loginOpen, setLoginOpen, setLoginClose] = useDialog();

  return (
    <>
      <Box sx={{paddingTop:"64px"}}
           id={"footerWrapper"}>
        <Grid container={true} justifyContent={"center"}>
          <Grid item={true}>
            <IconButton href={"mailto:jewon513@gmail.com"} color={"primary"}>
              <MailIcon/>
            </IconButton>
            <IconButton href={"https://github.com/jewon513"} color={"primary"}>
              <GitHubIcon/>
            </IconButton>
            <IconButton onClick={setLoginOpen} color={"primary"}>
              <LockIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid container={true} justifyContent={"center"}>
          <Grid item={true}>
            <Box>
              <Typography variant={"body2"}>
                jewon513@gmail.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <LoginFormDialog open={loginOpen} handleClose={setLoginClose}/>
    </>
  )
}

export default Footer