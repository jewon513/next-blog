import Layout from "../components/Layout";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {LegacyRef, useEffect, useRef} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";

const PostWrite = ()=>{

  const editorRef = useRef()

  useEffect(()=>{
    console.log(editorRef.current)
  },[])

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
      />
      <TextField
        autoFocus
        margin="dense"
        id="subtitle"
        label="Subtitle"
        fullWidth
        variant="outlined"
        color={"primary"}
      />
      <Box sx={{
        bgcolor:"white",
        color:"black",
        borderRadius:"4px",
        marginTop:"8px"
      }}>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="600px"
          initialEditType={'wysiwyg'}
          useCommandShortcut={true}
          ref={editorRef as LegacyRef<any>}
        />
      </Box>
      <Grid container={true} justifyContent={"right"} sx={{
        marginTop:"15px"
      }}>
        <Grid item={true}>
          <Button variant={"outlined"} onClick={()=>{}} color={"warning"}>Cancle</Button>
          <Button variant={"outlined"} type={"submit"} color={"primary"} sx={{
            marginLeft:"8px"
          }}>Submit</Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default PostWrite