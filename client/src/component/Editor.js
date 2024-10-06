import React, { useEffect } from 'react'
import { useRef } from 'react';// Import the codemirror module
import 'codemirror/mode/javascript/javascript';     // Code mirror mode for javascript
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import "codemirror/lib/codemirror.css"; // Code mirror css
import CodeMirror from "codemirror"; 



// code editor

function Editor() {
  const editorRef = useRef(null);

  useEffect(()=>{
         const init = async ()=>{
          const editor = CodeMirror.fromTextArea(
            document.getElementById("realTimeEditor"),
            {
              mode:{name:"javascript",json:true},
              theme:"dracula",
              autoCloseTags:true,
              autoCloseBrackets:true,
              lineNumbers:true,

            }
          )
          editor.setSize(null, "100%")
         }
          init(); 
  },[])

  return (
    <div style={{height:"600px"}}>
        <textarea id="realTimeEditor" spellCheck="false"></textarea>
    </div> 
  )
}

export default Editor