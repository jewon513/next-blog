import Layout from "../components/Layout";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Editor } from '@toast-ui/react-editor';
import {LegacyRef, useRef} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import useInput from "../hooks/useInput";
import usePostWrite from "../hooks/usePostWrite";
import {PostParam} from "../query/post";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

const PostWrite = ()=> {

  const router = useRouter()
  const editorRef = useRef<Editor>()
  const [title, setTitle, onTitleChange] = useInput("");
  const [subtitle, setSubtitle, onSubtitleChange] = useInput("");
  const user = useSelector(state => state.user)
  const theme = useSelector(state=>state.common.mode)

  const postWrite = usePostWrite()
  const submit = () => {
    const html = editorRef?.current?.getInstance().getMarkdown()
    const contents = html ? html : ""
    const param: PostParam = {
      post_user_no: user.userData.user_no,
      post_contents: contents,
      post_subtitle: subtitle,
      post_title: title
    }
    postWrite(param).then(res => {
      console.log(res)
      router.replace("/")
    }).catch(e => {
      console.error(e)
    })
  }

  return (
    <Layout>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        fullWidth
        variant="outlined"
        color={"primary"}
        onChange={onTitleChange}
        value={title}
      />
      <TextField
        autoFocus
        margin="dense"
        id="subtitle"
        label="Subtitle"
        fullWidth
        variant="outlined"
        color={"primary"}
        onChange={onSubtitleChange}
        value={subtitle}
      />
      <Box sx={{
        borderRadius:"4px",
        marginTop:"8px"
      }}>
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType={'markdown'}
          ref={editorRef as LegacyRef<any>}
        />
      </Box>
      <Grid container={true} justifyContent={"right"} sx={{
        marginTop: "15px"
      }}>
        <Grid item={true}>
          <Button variant={"outlined"} onClick={() => {
          }} color={"warning"}>Cancel</Button>
          <Button variant={"outlined"}
                  color={"primary"}
                  onClick={submit}
                  sx={{
                    marginLeft: "8px"
                  }}>Submit</Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default PostWrite