import React from "react";
import styled from "styled-components";

const SidePanel = styled.div`
  margin-bottom: 20px;
  box-shadow: 0px 1px 2px #999;
  // width: 300px;
  background-color: #fff;
  // display: inline-block;
`;

const Title = styled.h4`
  padding: 20px 15px;
  border-bottom: 1px solid #eee;
  margin: 0;
`;

const Body = styled.div`
  padding: 15px;
`;

const List = styled.div`
  list-style: none;
`;

const ListItem = styled.li`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export default function() {
  return (
    <SidePanel>
      <Title>Categories</Title>
      <Body>
        <List>
          <ListItem>Trading for money</ListItem>
          <ListItem>Vauly Key Giveaway</ListItem>
          <ListItem>Misc. Gun Locations</ListItem>
          <ListItem>Looking for Players</ListItem>
        </List>
      </Body>
    </SidePanel>
  );
}
