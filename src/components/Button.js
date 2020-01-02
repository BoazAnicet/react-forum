import styled from "styled-components";
import { danger, info, primary, success, warning } from "../utils/colors";

const Button = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: ${props =>
    (props.type === "primary" && primary) ||
    (props.type === "success" && success) ||
    (props.type === "info" && info) ||
    (props.type === "warning" && warning) ||
    (props.type === "danger" && danger)};
  border: none;
  border-radius: 5px;

  :focus {
    outline: none;
  }
`;

export default Button;
