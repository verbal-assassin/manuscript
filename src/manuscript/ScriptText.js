import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";

export const ScriptText = ({ manuText, fontSize, onWordCountChange }) => {

  const [rrr, setrrr] = useState(manuText);
  const [fake, setfake] = useState(false);
  console.log(`after RRR = ${rrr}`);

  useEffect(() => {

    setrrr(manuText);
    onWordCountChange(rrr)
  }, [manuText]);

  const [editable, setEditable] = useState(false);

  const handleChange = (evt) => {

    const currentValue = evt.target.value;
    setrrr(currentValue);
    onWordCountChange(rrr)
  };

  return (
    <ContentEditable
      html={rrr}
      onChange={handleChange}
      disabled={false}
      style={{
        fontSize: "12 px",
        textAlign: "left",
        padding: "5px",
        border: "1px dashed #aaa",
        minHeight: "100px",
      }}
    />
  );
};
