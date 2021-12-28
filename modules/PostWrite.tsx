import {useSelector} from "react-redux";

import {Box, Button, Chip, Divider, Grid, Stack, TextField} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CodeIcon from '@mui/icons-material/Code';
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';

import {EditorContent, useEditor} from "@tiptap/react";

import {useRouter} from "next/router";
import useInput from "../hooks/useInput";
import usePostWrite from "../hooks/usePostWrite";
import {PostType} from "../query/post";
import Layout from "../components/Layout";
import CreateIcon from "@mui/icons-material/Create";
import useTipTapEditor from "../hooks/useTipTapEditor";
import React, {LegacyRef, useRef, useState} from "react";
import axios from "axios";


const PostWrite = ({post}:{post:PostType})=>{

  const router = useRouter()
  const [title, setTitle, onTitleChange] = useInput(post.post_title);
  const [subtitle, setSubtitle, onSubtitleChange] = useInput(post.post_subtitle);
  const user = useSelector(state => state.user)

  const editor = useTipTapEditor(post.post_contents, true)

  const addImage = () =>{
    if(inputRef.current){
      inputRef.current.click()
    }
  }

  const [postWrite, postWriteState] = usePostWrite()
  const submit = () => {
    const html = editor?.getHTML()
    const contents = html ? html : ""
    const param = {
      post_no : post.post_no,
      post_user_no: user.userData.user_no,
      post_contents: contents,
      post_subtitle: subtitle,
      post_title: title,
      post_tag_list: tagList
    }
    console.log(param)
    postWrite(param)
  }

  const inputRef = useRef<HTMLInputElement>();
  const handleImageUpd = (e)=>{
    const files = e.target.files
    const body = new FormData();
    body.append("image", files[0])
    axios.post("/api/image",body,{
      headers: { 'content-type': 'multipart/form-data' }
    }).then(res=>{
      const {data} = res
      let imgTag = `<img src='${data.url}' data-ref='${data.filename}'/>`
      editor?.commands.insertContent(imgTag)
    })
  }

  const [tag, setTag, onTagChange] = useInput('')
  const [tagList, setTagList] = useState((post.post_tags && post.post_tags !== "" ) ? post.post_tags.split(",") : [])

  return (
    <Layout>
      {/* 상단 제목, 부제목 */}
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        fullWidth
        variant="standard"
        color={"primary"}
        onChange={onTitleChange}
        value={title}
      />
      <TextField
        margin="dense"
        id="subtitle"
        label="Subtitle"
        fullWidth
        variant="standard"
        color={"primary"}
        onChange={onSubtitleChange}
        value={subtitle}
      />

      {/* 에디터 */}
      <Box sx={{
        marginTop:"8px",
        marginBottom:"4px",
        border:"1px solid",
        borderRadius:1,
        borderColor:"grey.400",
        height:"600px"
      }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          flexWrap={"wrap"}
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
      <Stack direction="row" spacing={1}>
        {tagList.map((tag, index)=>{
          return (
            <Chip
              key={index}
              label={tag}
              size={"small"}
              variant={"outlined"}
              clickable={true}
              onDelete={()=>{
                const tempList = [...tagList]
                tempList.splice(index,1)
                setTagList(tempList)
              }}
            />
          )
        })}
      </Stack>
      <TextField
        fullWidth
        margin="dense"
        id="subtitle"
        label="Tag"
        variant="standard"
        color={"primary"}
        value={tag}
        onChange={onTagChange}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            console.log("add tag")
            const tempList = [...tagList]
            tempList.push(tag)
            setTagList(tempList)
            setTag("")
          }
        }}
      />

      {/* 하단 버튼 */}
      <Grid container={true} justifyContent={"right"} sx={{
        marginTop: "15px"
      }}>
        <Grid item={true}>
          <LoadingButton
            variant={"outlined"}
            onClick={() => {
              router.back()
            }}
            startIcon={<CancelIcon />}
            color={"warning"}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant={"outlined"}
            color={"primary"}
            onClick={submit}
            loading={postWriteState === "loading"}
            startIcon={<CreateIcon />}
            sx={{
              marginLeft: "8px"
            }}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>

      <input
        id="hiddenInput"
        style={{display: "none"}}
        type="file"
        accept="image/*"
        multiple={true}
        ref={inputRef as LegacyRef<any>}
        onChange={handleImageUpd}
      />
    </Layout>
  )
}

export default PostWrite
