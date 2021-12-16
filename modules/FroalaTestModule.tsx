import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins/align.min';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/css/plugins/image.css';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/css/third_party/image_tui.css';
import 'froala-editor/js/languages/ko.js';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import {LegacyRef, useCallback, useEffect, useMemo, useRef, useState} from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const FroalaTestModule = ()=> {

  const editorRef = useRef<FroalaEditorComponent>()
  const inputRef = useRef();
  const handleImageUpd = (e) => {
    console.log(e)
    setModel(e)
  }
  const [model, setModel] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current?.getEditor()

    }
  }, [editorRef.current])

  return (
    <>
      <button onClick={() => {
        if (editorRef.current) {
          editorRef.current.getEditor().align.apply('left')
        }
      }}>
        왼쪽
      </button>
      <button onClick={() => {
        if (editorRef.current) {
          editorRef.current.getEditor().align.apply('center')
        }
      }}>
        중간
      </button>
      <button onClick={() => {
        if (editorRef.current) {
          editorRef.current.getEditor().align.apply('right')
        }
      }}>
        오른쪽
      </button>
      <button onClick={() => {
        if (editorRef.current) {
          const editor = editorRef.current.getEditor()
          const fragment = document.createElement("div")
          for (let i = 0; i < 2; i++) {
            editor.html.insert(`<img src="https://picsum.photos/300/300" style="width: 100%;" data-token="token" class="imageClass"/>`, true)
          }
          setTimeout(()=>{
            const images = document.getElementsByClassName("imageClass")
            images[images.length-1].scrollIntoView({block:"start"})
          },500)
        }
      }}>
        이미지 업로드
      </button>
      <FroalaEditorComponent
        tag={"div"}
        model={""}
        ref={editorRef as LegacyRef<any>}
        config={{
          language: 'ko',
          placeholderText: 'Edit Your Content Here!',
          attribution: false,
          autofocus: true,
          toolbarSticky: true,
          imageAllowedTypes: ['jpeg', 'jpg', 'png'],
          imageDefaultWidth: 0,
          imageEditButtons: ["imageRemove"],
          imageAddNewLine: "true",
        }}
        onModelChange={(e)=>{
          console.log(e)
        }}
      />
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

export default FroalaTestModule