import {Box, Container} from "@mui/material";
import {ReactNode} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const Layout = ({children}:{children:ReactNode})=>{
  return (
    <Box sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
    }}>
      <Container maxWidth={"md"}>

        <Header/>

        <Main>
          {children}
        </Main>

        <Footer/>

      </Container>
    </Box>
  )
}

export default Layout