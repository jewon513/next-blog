import {Alert, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import {Snack, snackActions} from "../store/modules/snack";
import {useDispatch, useSelector} from "react-redux";

const SnackUtil = () => {

  const [list, setList] = useState<Snack[]>([])
  const [removeItem, setRemoveItem] = useState<Snack | undefined>(undefined)
  const snack = useSelector(state => state.snack)
  const dispatch = useDispatch()

  // watching redux state...
  useEffect(() => {
    if (snack.id !== "") {
      setList([...list, {...snack}])
      dispatch(snackActions.resetSnack())
    }
  }, [snack])

  // set snack...
  useEffect(() => {
    const item = list[0]
    setRemoveItem(item)
  }, [list])

  // clear snack...
  useEffect(() => {
    if (removeItem) {
      setTimeout(() => {
        setList(prev => {
          const tempList = prev.map(prevItem => {
            if (prevItem.id === removeItem.id) {
              prevItem.open = false
            }
            return prevItem
          })
          return tempList
        })
      }, removeItem.duration - 500)
      setTimeout(() => {
        setList(prev => {
          const index = prev.findIndex(prevItem => prevItem.id == removeItem.id)
          const tempList = [...prev]
          tempList.splice(index, 1)
          return tempList
        })
      }, removeItem.duration)
    }
  }, [removeItem])

  return (
    <>
      {list.slice(0, 1).map((item, index) => {
        return (
          <Snackbar
            key={item.id}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            open={item.open}
            sx={{
              top: "70%"
            }}
          >
            <Alert elevation={6} variant={"filled"} severity={item.severity} sx={{width: "100%"}}>{item.msg}</Alert>
          </Snackbar>
        )
      })}
    </>
  )
}

export default SnackUtil