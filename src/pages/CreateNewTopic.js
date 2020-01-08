// import React from "react";

// import { Container } from "styled-bootstrap-grid";
// import Dante from "dante2";
// import styled from "styled-components";
// import { Form, Segment } from "semantic-ui-react";
// import RTE from "react-rte";

// const Editor = props => {
//   return (
//     <Container>
//       <Segment>
//         {/* <Dante
//         style={{
//           padding: 32,
//           width: "100%",
//           border: "1px solid #999",
//           backgroundColor: "#FFF"
//         }}
//         /> */}
//         ?fsdfgf
//         {/* <RTE /> */}
//       </Segment>
//     </Container>
//   );
// };

import React, { Component, PropTypes } from "react";
import RichTextEditor from "react-rte";
import { Container } from "styled-bootstrap-grid";

class MyStatefulEditor extends Component {
  state = {
    value: RichTextEditor.createEmptyValue()
  };

  onChange = value => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(value.toString("html"));
    }
  };

  render() {
    return (
      <Container>
        <RichTextEditor value={this.state.value} onChange={this.onChange} />
      </Container>
    );
  }
}

export default MyStatefulEditor;
