// components/user/Text.js
import React, { useCallback, useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";

import { useNode } from "@craftjs/core";

export const CraftText = ({ text, fontSize }) => {
  
  const { connectors: {connect, drag}, selected, dragged, actions: {setProp} } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {!selected && setEditable(false)}, [selected]);

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <ContentEditable
        html={text}
        onChange={(e) =>
          setProp(
            (props) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
          )
        }
        tagName="p"
        style={{ 
          fontSize: `${fontSize}px`, 
          textAlign: 'left',
          padding: '5px',
          border: '1px dashed #aaa',
          minHeight: '100px'
        }}
      />
    </div>
  );
};

CraftText.craft = {
  rules: {
    canDrag: (node) => node.data.props.text !== "Drag",
  },
};
