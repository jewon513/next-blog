import type {AppProps} from 'next/app'
import wrapper from "../store";
import {ThemeProvider} from "@mui/material";
import useChangeTheme from "../hooks/useChangeTheme";
import '@toast-ui/editor/dist/toastui-editor.css';
import "../styles/global.css"
import 'reset-css';
import {useDispatch} from "react-redux";
import {verifyAuth} from "../lib/auth";
import {userAction} from "../store/modules/user";
import {LoginResult} from "../query/user";

function MyApp({ Component, pageProps }: AppProps) {

  const {theme} = useChangeTheme()
  const dispatch = useDispatch()

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async(appContext)=>{
  const {Component, ctx} = appContext
  let pageProps = {};
  // 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const jwtCheckResult = await verifyAuth({cookie:ctx.req?.headers.cookie})

  if(jwtCheckResult.data){
    store.dispatch(userAction.login(jwtCheckResult.data.userData as LoginResult))
  }

  // _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
  pageProps = { ...pageProps};

  return { pageProps };
})

export default wrapper.withRedux(MyApp)
