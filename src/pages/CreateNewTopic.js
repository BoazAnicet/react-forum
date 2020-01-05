import React from "react";

import { Container } from "styled-bootstrap-grid";
import Dante from "dante2";
import styled from "styled-components";

const MyEditor = styled(Dante)`
  padding: 32px;
  width: 100%;
  border: 1px solid #999;
  background-color: #fff;
`;

const Editor = props => {
  return (
    <Container>
      <MyEditor />
      <Dante
        style={{
          padding: 32,
          width: "100%",
          border: "1px solid #999",
          backgroundColor: "#FFF"
        }}
      />
    </Container>
  );
};

export default Editor;
