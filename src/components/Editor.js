import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Paper, SvgIcon, makeStyles, Divider } from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  // eslint-disable-next-line
  Code,
  LooksOne,
  LooksTwo
  // FormatQuote
  // FormatListNumbered,
  // FormatListBulleted
} from "@material-ui/icons";

import { ToggleButton } from "@material-ui/lab";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const useStyles = makeStyles(theme => ({
  button: { border: "none" }
}));

export default props => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const classes = useStyles();

  const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <ToggleButton
        selected={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        className={classes.button}
        value={format}
        disableTouchRipple
      >
        <SvgIcon>{icon}</SvgIcon>
      </ToggleButton>
    );
  };

  const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
      <ToggleButton
        selected={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        className={classes.button}
        value={format}
        disableTouchRipple
      >
        <SvgIcon>{icon}</SvgIcon>
      </ToggleButton>
    );
  };

  return (
    <div className={classes.wrapper}>
      {/* <Slate editor={editor} value={value} onChange={value => setValue(value)}> */}
      <Slate editor={editor} {...props}>
        {/* <Paper elevation={0} style={{ padding: "0px 10px" }}> */}
        <Paper elevation={0} style={{ padding: "10px 20px" }}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            // placeholder="Enter some text…"
            spellCheck
            autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
            readOnly={props.readOnly}
          />
        </Paper>
        {!props.readOnly ? (
          <Paper
            elevation={0}
            style={{ padding: "0 20px 0 20px" }}
            className={classes.toolbar}
            square
          >
            <Divider />
            {/** Toolbar */}
            <MarkButton format="bold" icon={<FormatBold />} />
            <MarkButton format="italic" icon={<FormatItalic />} />
            <MarkButton format="underline" icon={<FormatUnderlined />} />
            <MarkButton format="strikethrough" icon={<StrikethroughS />} />
            {/* <MarkButton format="code" icon={<Code />} /> */}
            <BlockButton format="heading-one" icon={<LooksOne />} />
            <BlockButton format="heading-two" icon={<LooksTwo />} />
            {/* <BlockButton format="block-quote" icon={<FormatQuote />} /> */}
            {/* <BlockButton format="numbered-list" icon={<FormatListNumbered />} /> */}
            {/* <BlockButton format="bulleted-list" icon={<FormatListBulleted />} /> */}
          </Paper>
        ) : (
          <></>
        )}
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return (
        <h1 style={{ marginTop: 0 }} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={{ marginTop: 0 }} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

// eslint-disable-next-line
const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text "
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote in the middle of the page, like this:"
      }
    ]
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }]
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }]
  }
];
