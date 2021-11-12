import {Box, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";
import {commonActions} from "../../store/modules/common";
import MailIcon from '@mui/icons-material/Mail';

const DrawerList = ()=>{

  const dispatch = useDispatch()
  const menuList = [
    "List1",
    "List2",
    "List3",
    "List4",
  ]

  return (
    <Box
      width={250}
      role={"presentation"}
      onClick={()=>{dispatch(commonActions.toggleDrawer())}}
    >
      <List>
        {menuList.map(menu=>{
          return (
            <ListItem button={true} key={menu}>
              <ListItemIcon>
                <MailIcon/>
              </ListItemIcon>
              <ListItemText>
                {menu}
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

}

export default DrawerList