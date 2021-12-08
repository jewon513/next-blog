import {useSelector} from "react-redux";

import {Box, Button, Divider, Grid, TextField} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CodeIcon from '@mui/icons-material/Code';

import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import lowlight from 'lowlight'

import {useRouter} from "next/router";
import useInput from "../hooks/useInput";
import usePostWrite from "../hooks/usePostWrite";
import {PostParam} from "../query/post";
import Layout from "../components/Layout";


const PostWrite = ()=>{

  const router = useRouter()
  const [title, setTitle, onTitleChange] = useInput("");
  const [subtitle, setSubtitle, onSubtitleChange] = useInput("");
  const user = useSelector(state => state.user)
  const theme = useSelector(state=>state.common.mode)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.extend({
        addAttributes(){
          return{
            class:{
              default: null
            },
            src:{
              default: null
            },
          }
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Code,
      CodeBlock,
      CodeBlockLowlight
        .configure({
          lowlight,
          defaultLanguage:"javascript"
      }),
    ],
    content: ``,
  })

  const addImage = () =>{
    const url = window.prompt('URL')

    if (url) {
      let temp = `<img src='${url}' class="insertImg"/>`
      editor?.commands.insertContent(temp)
    }
  }

  const postWrite = usePostWrite()
  const submit = () => {
    const html = document.getElementsByClassName("ProseMirror")[0].innerHTML
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
      {/* 상단 제목, 부제목 */}
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
        margin="dense"
        id="subtitle"
        label="Subtitle"
        fullWidth
        variant="outlined"
        color={"primary"}
        onChange={onSubtitleChange}
        value={subtitle}
      />

      {/* 에디터 */}
      <Box sx={{
        marginTop:"8px",
        border:"1px solid",
        borderRadius:1,
        borderColor:"grey.400",
        height:"600px"
      }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{
            borderRadius:1,
            backgroundColor:"#f7f9fc",
            padding:"0px 15px"
          }}>
          <FormatBoldIcon className={"editor__toolbar_icon"} onClick={()=>editor?.chain().focus().toggleBold().run()}/>
          <TitleIcon className={"editor__toolbar_icon"} onClick={()=>editor?.chain().focus().toggleHeading({level:2}).run()}/>
          <FormatAlignLeftIcon className={"editor__toolbar_icon"} onClick={()=>editor?.chain().focus().setTextAlign("left").run()}/>
          <FormatAlignCenterIcon  className={"editor__toolbar_icon"} onClick={()=>editor?.chain().focus().setTextAlign("center").run()}/>
          <FormatAlignRightIcon className={"editor__toolbar_icon"} onClick={()=>editor?.chain().focus().setTextAlign("right").run()}/>
          <FormatListBulletedIcon className={"editor__toolbar_icon"} onClick={()=>editor?.chain().focus().toggleBulletList().run()}/>
          <FormatListNumberedIcon className={"editor__toolbar_icon"} onClick={()=>editor?.chain().focus().toggleOrderedList().run()}/>
          <AddPhotoAlternateOutlinedIcon className={"editor__toolbar_icon"} onClick={()=>{addImage()}}/>
          <CodeIcon className={"editor__toolbar_icon"} onClick={()=>{editor?.chain().focus().toggleCodeBlock().run()}}/>
        </Box>
        <Divider/>
        <EditorContent editor={editor} className={"editor__content"} style={{
          position:"relative",
          height:"560px",
          boxSizing:"border-box",
          padding:"15px"
        }}/>
      </Box>

      {/* 하단 버튼 */}
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
