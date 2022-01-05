import {Box} from "@mui/material";
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/languages/ko.js';
import 'froala-editor/js/plugins/image.min';
import 'froala-editor/css/plugins/image.css';
import 'froala-editor/js/plugins/file.min';
import 'froala-editor/css/plugins/file.css';
import FroalaEditor from 'froala-editor'
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import FroalaEditorComponent from 'react-froala-wysiwyg';
import {LegacyRef, useEffect, useRef, useState} from "react";

FroalaEditor.DefineIcon('alert', {NAME: 'info', SVG_KEY: 'help'});
FroalaEditor.RegisterCommand('alert', {
  title: 'Hello',
  focus: false,
  undo: false,
  refreshAfterCallback: false,
  callback: function () {
    alert('Hello!');
  }
});

FroalaEditor.DefineIcon('clear', {NAME: 'remove', SVG_KEY: 'remove'});
FroalaEditor.RegisterCommand('clear', {
  title: 'Clear HTML',
  focus: false,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    console.log(this)
    this.html.set('');
    this.events.focus();
  }
});

FroalaEditor.DefineIcon('insert', {NAME: 'plus', SVG_KEY: 'add'});
FroalaEditor.RegisterCommand('insert', {
  title: 'Insert HTML',
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.insert('My New HTML');
  }
});

// 아이콘 추가 방법
// https://froala.com/wysiwyg-editor/docs/concepts/custom/icon
FroalaEditor.DefineIconTemplate('material_design', '<div class="[NAME]">테스트</div>');
FroalaEditor.DefineIcon('test',{NAME: 'smartphone', template: 'material_design'});
FroalaEditor.RegisterCommand('test', {
  title: 'test',
  focus: false,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    // 여기서 this 는 editor 입니다..
    const fragment = document.createElement("div")
    for (let i = 1; i < 6; i++) {
      this.html.insert(`<img src="https://picsum.photos/${i}00/100" style="display: block; width: 100%" data-token="token" class="imageClass"/>`, true)
    }
    console.log(this)
  }
});


const FroalaModule = ()=>{

  const editorRef = useRef<FroalaEditorComponent>();
  const [html, setHtml] = useState("")

  useEffect(()=>{
    if(editorRef.current){
      console.log(editorRef.current)
    }
  },[editorRef.current])

  return (
    <>
      <Box>
        <FroalaEditorComponent
          tag={"textarea"}
          model={'<div>\n <img src="https://photo2.yeoboya.com/prdctCont/image/YUlDQ2VJS0xlN2RXYVdWamFIdUJkNENGZDVCV2JXTmpiMzJFZEwvQXJBPT0.?sdir=&amp;size=" style="width: 100%; margin: 4px 0px;">\n</div>\n<div>\n <div>\n  <img src="https://photo2.yeoboya.com/prdctCont/image/YUlDQ2VJS0xlN2RXYVdWamFIdUJkNENGZDVCWWNtTm9hMytHZEwvQXJBPT0.?sdir=&amp;size=" style="width: 100%; margin: 4px 0px;">\n </div>\n <div>\n  <br>\n </div>\n <br>\n</div>'}
          config={{
            enter: FroalaEditor.ENTER_DIV,
            toolbarButtons: ['alert','clear','insert','test'],
            language: 'ko',
            attribution: false,
            placeholderText: 'Edit Your Content Here!',
            charCounterCount: false,
            events:{
              contentChanged: function () {
                // Do something here.
                // this is the editor instance.
                // @ts-ignore
                setHtml(this.html.get(true))
              }
            },
            imageDefaultWidth:"100%",
            imageResize:false,
            imageMultipleStyles:true,
            imageMove:false,
            imagePaste:false,
            imageResizeWithPercent:true,
            imageAddNewLine:true,
            imageEditButtons:[
              'imageRemove'
            ]
          }}
          ref={editorRef as LegacyRef<FroalaEditorComponent>}
        />
      </Box>
      <Box>
        <div dangerouslySetInnerHTML={{__html:html}}></div>
      </Box>
    </>
  )
}

export default FroalaModule