import {Drawer, Grid, IconButton, Typography, useTheme} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../store/modules/common";
import DrawerList from "./list/DrawerList"
import useGoMain from "../hooks/useGoMain";
import useChangeTheme from "../hooks/useChangeTheme";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ()=>{

  const dispatch = useDispatch()
  const drawerOpen = useSelector(state=>state.common.drawerOpen)
  const theme = useTheme()
  const {toggleEvent} = useChangeTheme()
  const goMain = useGoMain()


  return (
    <>
      <Grid container={true}
            id={"headerWrapper"}
            sx={{
              paddingY: 2
            }}
            alignItems={"center"}>
        <Grid item={true}>
          <img src={"/bunny-1298864.svg"} style={{
            height:"30px",
            width:"30px",
            marginRight:"4px",
            marginTop:"4px"
          }}/>
        </Grid>
        <Grid item={true}>
          <Typography variant={"h4"} sx={{
            fontWeight:"bold",
            cursor:"pointer"
          }} onClick={goMain}>
            TokkI
          </Typography>
        </Grid>
        <Grid item={true} sx={{marginLeft:"auto"}}>
          <IconButton onClick={toggleEvent} color={"inherit"}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton onClick={()=>{dispatch(commonActions.toggleDrawer())}} color={"inherit"}>
            <MenuIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <Drawer anchor={"right"} open={drawerOpen} onClose={()=>{dispatch(commonActions.toggleDrawer())}}>
        <DrawerList/>
      </Drawer>
    </>
  )
}

export default Header