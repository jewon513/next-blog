import FormatBoldIcon from "@mui/icons-material/FormatBold";
import TitleIcon from "@mui/icons-material/Title";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CodeIcon from "@mui/icons-material/Code";
import {Backdrop, Box, CircularProgress} from "@mui/material";
import React, {LegacyRef, useRef, useState} from "react";
import axios from "axios";
import {Editor} from "@tiptap/react";


const EditorToolBar = ({editor}:{editor:Editor|null})=>{

  const [loading, setLoading] = useState(false)

  const addImage = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  const inputRef = useRef<HTMLInputElement>();
  const handleImageUpd = (e) => {
    setLoading(true)
    const files = e.target.files
    const body = new FormData();
    body.append("image", files[0])
    axios.post("/api/image", body, {
      headers: {'content-type': 'multipart/form-data'}
    }).then(res => {
      const {data} = res
      let imgTag = `<img src='${data.url}' data-ref='${data.filename}'/>`
      editor?.commands.insertContent(imgTag)
      setLoading(false)
    })
  }

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexWrap={"wrap"}
        sx={{
          borderRadius: 1,
          bgcolor: 'background.default',
          padding: "0px 15px"
        }}>
        <FormatBoldIcon className={"editor__toolbar_icon"}
                        onClick={() => editor?.chain().focus().toggleBold().run()}/>
        <TitleIcon className={"editor__toolbar_icon"}
                   onClick={() => editor?.chain().focus().toggleHeading({level: 2}).run()}/>
        <FormatAlignLeftIcon className={"editor__toolbar_icon"}
                             onClick={() => editor?.chain().focus().setTextAlign("left").run()}/>
        <FormatAlignCenterIcon className={"editor__toolbar_icon"}
                               onClick={() => editor?.chain().focus().setTextAlign("center").run()}/>
        <FormatAlignRightIcon className={"editor__toolbar_icon"}
                              onClick={() => editor?.chain().focus().setTextAlign("right").run()}/>
        <FormatListBulletedIcon className={"editor__toolbar_icon"}
                                onClick={() => editor?.chain().focus().toggleBulletList().run()}/>
        <FormatListNumberedIcon className={"editor__toolbar_icon"}
                                onClick={() => editor?.chain().focus().toggleOrderedList().run()}/>
        <AddPhotoAlternateOutlinedIcon className={"editor__toolbar_icon"} onClick={() => {
          addImage()
        }}/>
        <CodeIcon className={"editor__toolbar_icon"} onClick={() => {
          editor?.chain().focus().toggleCodeBlock().run()
        }}/>
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>

      <input
        id="hiddenInput"
        style={{display: "none"}}
        type="file"
        accept="image/*"
        multiple={true}
        ref={inputRef as LegacyRef<any>}
        onChange={handleImageUpd}
      />
    </>
  )
}

export default EditorToolBar