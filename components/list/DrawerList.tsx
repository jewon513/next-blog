import {Box, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../../store/modules/common";
import DrawMenu from "../menu/DrawMenu";

export type MenuType = {
  txt:string,
  link:string,
  role:Array<string>,
}

const DrawerList = ()=>{

  const dispatch = useDispatch()
  const userData = useSelector(state=>state.user.userData)

  const menuList:Array<MenuType> = [{
    txt:"Main",
    link:"/",
    role: ["all", "user", "admin"]
  },{
    txt:"About",
    link:"/about",
    role: ["all", "user", "admin"]
  },{
    txt:"Write",
    link:"/write",
    role: ["admin"]
  }]

  return (
    <Box
      width={250}
      role={"presentation"}
      onClick={()=>{dispatch(commonActions.toggleDrawer())}}
    >
      <List>
        {menuList.filter(menu=>{
          if(menu.role.includes(userData.user_role)){
            return menu
          }
        }).map(menu=>{
          return (
            <DrawMenu menuTxt={menu.txt} link={menu.link} key={menu.txt}/>
          )
        })}
      </List>
    </Box>
  )

}

export default DrawerList