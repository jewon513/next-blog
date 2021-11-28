import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CreateIcon from '@mui/icons-material/Create';
import {useRouter} from "next/router";

const DrawMenu = ({menuTxt, link})=>{

  const router = useRouter()
  const move = ()=>{
    router.push({pathname:link})
  }

  return (
    <ListItem button={true} key={menuTxt} onClick={move}>
      <ListItemIcon>
        <DrawMenuIcon menuTxt={menuTxt}/>
      </ListItemIcon>
      <ListItemText>
        {menuTxt}
      </ListItemText>
    </ListItem>
  )

}

const DrawMenuIcon = ({menuTxt})=>{
  switch (menuTxt) {
    case "Main": return <HomeIcon/>
    case "About": return <InfoIcon/>
    case "Write": return <CreateIcon/>
    default: return <></>
  }
}

export default DrawMenu