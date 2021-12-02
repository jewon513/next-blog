import {Drawer, Grid, IconButton, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../store/modules/common";
import DrawerList from "./list/DrawerList"
import useGoMain from "../hooks/useGoMain";

const Header = ()=>{

  const dispatch = useDispatch()
  const drawerOpen = useSelector(state=>state.common.drawerOpen)
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
          <Typography variant={"h4"} sx={{
            fontWeight:"bold",
            cursor:"pointer"
          }} onClick={goMain}>
            <img src={"/bunny-1298864.svg"} style={{
              height:"30px",
              width:"30px",
              marginRight:"4px",
            }}/>
            TokkI
          </Typography>
        </Grid>
        <Grid item={true} sx={{marginLeft:"auto"}}>
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