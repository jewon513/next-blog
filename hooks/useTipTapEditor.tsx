import {useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import {TextStyle} from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import lowlight from "lowlight";

const useTipTapEditor = (content= "", editable=true)=>{
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
      TextStyle.extend({
        addAttributes(){
          return {
            class:{
              default: null
            }
          }
        }
      }),
      CodeBlockLowlight
        .configure({
          lowlight,
          defaultLanguage:"javascript"
        }),
    ],
    content: content,
    editable: editable
  })

  return editor
}

export default useTipTapEditor