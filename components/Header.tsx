import {Box, Drawer, Grid, IconButton, Typography, useTheme} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useChangeTheme from "../hooks/useChangeTheme";
import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../store/modules/common";
import DrawerList from "./list/DrawerList";

const Header = ()=>{

  const dispatch = useDispatch()
  const drawerOpen = useSelector(state=>state.common.drawerOpen)
  const theme = useTheme()
  const {toggleEvent} = useChangeTheme()

  return (
    <>
      <Grid container={true}
            id={"headerWrapper"}
            sx={{
              paddingY: 2
            }}
            justifyContent={"space-between"}
            alignItems={"center"}>
        <Grid item={true}>
          <Typography variant={"h4"}>
            Hello
          </Typography>
        </Grid>
        <Grid item={true}>
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