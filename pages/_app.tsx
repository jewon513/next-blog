import type {AppProps} from 'next/app'
import wrapper from "../store";
import {ThemeProvider} from "@mui/material";
import useChangeTheme from "../hooks/useChangeTheme";
import "../styles/global.css"
import 'reset-css';

function MyApp({ Component, pageProps }: AppProps) {

  const {theme} = useChangeTheme()

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default wrapper.withRedux(MyApp)
