import type {AppProps} from 'next/app'
import wrapper from "../store";
import {ThemeProvider} from "@mui/material";
import useChangeTheme from "../hooks/useChangeTheme";
import "../styles/global.css"
import 'reset-css';
import {useDispatch} from "react-redux";
import {commonActions} from "../store/modules/common";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import {verifyAuth} from "../lib/auth";
import {userAction} from "../store/modules/user";
import {LoginResult} from "../query/user";
import {useEffect} from "react";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {

  const {theme} = useChangeTheme()
  const dispatch = useDispatch()

  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(commonActions.setTheme("dark"))
    } else {
      dispatch(commonActions.setTheme("light"))
    }
  }, [])

  useEffect(()=>{
    axios.get("/api/sample").then(result=>{
      console.log(result)
    })
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async({ Component, ctx })=>{
  let pageProps = {};
  // 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const jwtCheckResult = await verifyAuth({cookie:ctx.req?.headers.cookie})

  if(jwtCheckResult.userData){
    store.dispatch(userAction.login(jwtCheckResult.userData as LoginResult))
  }

  // _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
  pageProps = { ...pageProps};

  return { pageProps };
})

export default wrapper.withRedux(MyApp)
