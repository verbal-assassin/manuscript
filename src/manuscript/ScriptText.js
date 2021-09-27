import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";

export const ScriptText = ({ text, fontSize }) => {
  console.log(`fontsize = ${fontSize}`)

  const [scriptText, setScriptText] = useState("<h1>hello</h1>")
  const [editable, setEditable] = useState(false);

  const handleChange = (evt) => {

    setScriptText(evt.target.value)
  }

  return (
      <ContentEditable
        html={scriptText}
        onChange={handleChange}
        disabled={editable}
        style={{ 
          //fontSize: `${fontSize}px`, 
          fontSize: '12 px',
          textAlign: 'left',
          padding: '5px',
          border: '1px dashed #aaa',
          minHeight: '100px'
        }}
      />
  );
};
