import React, { useState } from "react";

import { Container } from "styled-bootstrap-grid";
import Dante from "dante2";
import styled from "styled-components";

const MyEditor = styled(Dante)`
  padding: 32px;
`;

const Editor = props => {
  return (
    <Container>
      <Dante
        style={{
          padding: 32,
          width: "100%",
          border: "1px solid black",
          backgroundColor: "#FFF"
        }}
      />
    </Container>
  );
};

export default Editor;
