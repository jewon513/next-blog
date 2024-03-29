import type {AppProps} from 'next/app'
import wrapper from "../store";
import {Box, ThemeProvider} from "@mui/material";
import useChangeTheme from "../hooks/useChangeTheme";
import 'normalize.css';
import "../styles/global.css"
import "../styles/editor.css"
import {useDispatch} from "react-redux";
import {verifyAuth} from "../lib/auth";
import {userAction} from "../store/modules/user";
import {LoginResult} from "../query/user";
import Head from "next/head"
import SnackUtil from "../modules/SnackUtil";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import {commonActions} from "../store/modules/common";
import Layout from "../components/Layout";

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

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>TokkI</title>
        <meta charSet="utf-8"/>
        <meta name="author" content="Jewon Park"/>
        <meta name="description" content="Jewon's Blog"/>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <SnackUtil/>
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

  if (ctx.req?.url?.startsWith('/_next')) {
    console.log("refresh")
  }

  return { pageProps };
})

export default wrapper.withRedux(MyApp)
