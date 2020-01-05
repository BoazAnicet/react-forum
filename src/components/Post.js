import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";

const Post = styled.div`
  width: 100%;
  box-shadow: 0px 1px 2px #999;
  background-color: #fff;
  display: flex;
  margin-bottom: 20px;
`;

const PostAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
`;

const PostTitle = styled.h4`
  padding-bottom: 15px;
  margin: 0;
`;

const PostSnippet = styled.p`
  margin: 0;
  color: #999;
  font-size: 14px;
`;

const PostViews = styled.div`
  border-top: 1px solid #eee;
  padding: 10px;
`;

const PostCommentCount = styled.div`
  padding: 10px;
`;

const PostDate = styled.div`
  position: relative;
  border-top: 1px solid #eee;
  padding: 10px;

  ::after {
    content: attr(data-date);
    position: absolute;
    height: 30px;
    background-color: #fff;
    top: 100%;
    left: 0;
    width: 100%;
    visibility: hidden;
    box-shadow: 0px 1px 2px #999;
    border-radius: 5px;
    padding: 5px;
  }

  :hover::after {
    visibility: visible;
    transition-delay: 1s;
  }
`;

const AuthorContainer = styled.div`
  padding: 20px;
  border-right: 1px solid #eee;
`;

const TextContainer = styled.div`
  padding: 20px;
  border-right: 1px solid #eee;
  flex: 1;
`;

const InfoContainer = styled.div`
  min-width: 125px;
  font-size: 14px;
`;

export default ({ title, body, views, date, commentCount, avatar, link }) => {
  return (
    <Post>
      <AuthorContainer>
        <PostAvatar src={avatar} />
      </AuthorContainer>
      <TextContainer>
        <Link
          to={{
            pathname: `/post/dgdsa`,
            state: { id: "5e04326e00f80c2d1c24579a" }
          }}
        >
          <PostTitle>{title}</PostTitle>
        </Link>
        <PostSnippet>{body}</PostSnippet>
      </TextContainer>
      <InfoContainer style={{ textAlign: "center" }}>
        <PostCommentCount>{commentCount}</PostCommentCount>
        <PostViews>{views}</PostViews>
        <PostDate data-date={moment(date).format("MMM. Do, YYYY")}>
          {moment(date).fromNow()}
        </PostDate>
      </InfoContainer>
    </Post>
  );
};
