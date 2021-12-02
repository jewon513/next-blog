import type {NextPage} from 'next'
import {Container} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {sampleActions} from "../../store/modules/sample";

/**
 * saga counter sample...
 * @constructor
 */
const Home: NextPage = () => {

  const dispatch = useDispatch()

  return (
    <Container maxWidth={"sm"} disableGutters={true}>

    </Container>
  )
}

export default Home
