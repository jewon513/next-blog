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
  const sample = useSelector(state=> state.sample)

  return (
    <Container maxWidth={"sm"} disableGutters={true}>
      <button onClick={()=>{
        if(!sample.loading){
          dispatch(sampleActions.upCount(1))
        }
      }}>+</button>
      {sample.count}
      <button onClick={()=>{
        if(!sample.loading){
          dispatch(sampleActions.downCount(1))
        }
      }}>-</button>
      <div>
        {sample.loading ? "로딩중" : "대기"}
      </div>
    </Container>
  )
}

export default Home
