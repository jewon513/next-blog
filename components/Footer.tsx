import {Box, Grid, IconButton, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import MailIcon from '@mui/icons-material/Mail';

const Footer = ()=>{
  return (
    <Box sx={{paddingTop:"64px"}}
         id={"footerWrapper"}>
      <Grid container={true} justifyContent={"center"}>
        <Grid item={true}>
          <IconButton href={"mailto:jewon513@gmail.com"}>
            <MailIcon/>
          </IconButton>
          <IconButton href={"https://github.com/jewon513"}>
            <GitHubIcon/>
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
  )
}

export default Footer