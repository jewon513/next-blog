import type {AppProps} from 'next/app'
import wrapper from "../store";
import {ThemeProvider} from "@mui/material";
import useChangeTheme from "../hooks/useChangeTheme";
import "../styles/global.css"
import 'reset-css';
import {useEffect, useLayoutEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {commonActions} from "../store/modules/common";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";

function MyApp({ Component, pageProps }: AppProps) {

  const {theme} = useChangeTheme()
  const dispatch = useDispatch()
  const loading = useSelector(state => state.common.loading)

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(commonActions.setTheme("dark"))
    } else {
      dispatch(commonActions.setTheme("light"))
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp)
