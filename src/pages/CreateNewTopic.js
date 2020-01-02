import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import { Container } from "styled-bootstrap-grid";
import "draft-js/dist/Draft.css";

const CreateNewTopic = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <Container>
      huh?
      <Editor editorState={editorState} onChange={setEditorState} />
    </Container>
  );
};

export default CreateNewTopic;
