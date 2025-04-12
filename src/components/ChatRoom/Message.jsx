import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import { formatRelative } from "date-fns";

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  background-color: rgb(214, 209, 249);
  padding: 10px;
  border-radius: 5px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

function formatDate(createdAt) {
  if (!createdAt) return ""; // Tránh lỗi nếu createdAt là null hoặc undefined

  const date = new Date(createdAt.seconds * 1000);

  return formatRelative(date, new Date());
}

export default function Message({ text, displayName, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Avatar size="small" src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createdAt)}
        </Typography.Text>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography.Text className="content">{text}</Typography.Text>
      </div>
    </WrapperStyled>
  );
}
