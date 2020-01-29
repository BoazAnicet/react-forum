import React from "react";
import RichTextEditor from "react-rte";

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: [
    "INLINE_STYLE_BUTTONS",
    "BLOCK_TYPE_BUTTONS",
    "LINK_BUTTONS",
    "BLOCK_TYPE_DROPDOWN",
    "HISTORY_BUTTONS"
  ],
  INLINE_STYLE_BUTTONS: [
    { label: "Bold", style: "BOLD", className: "custom-css-class" },
    { label: "Italic", style: "ITALIC" },
    { label: "Strikethrough", style: "STRIKETHROUGH" },
    { label: "Underline", style: "UNDERLINE" }
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: "Normal", style: "unstyled" },
    { label: "Heading Large", style: "header-one" },
    { label: "Heading Medium", style: "header-two" },
    { label: "Heading Small", style: "header-three" }
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" }
  ]
};

const Editor = props => {
  return <RichTextEditor {...props} toolbarConfig={toolbarConfig} />;
};

export default Editor;

// import React, { useState, useRef } from "react";
// import JoditEditor from "jodit-react";

// const Example = ({}) => {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");

//   const config = {
//     readonly: false // all options from https://xdsoft.net/jodit/doc/
//   };

//   return (
//     <JoditEditor
//       ref={editor}
//       value={content}
//       config={config}
//       tabIndex={1} // tabIndex of textarea
//       onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//       onChange={newContent => {}}
//     />
//   );
// };

// export default Example;
