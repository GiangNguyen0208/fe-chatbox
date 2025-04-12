import React from "react";
import { Row, Col } from "antd";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import styled from "styled-components";

const SidebarStyled = styled.div`
  background: rgb(156, 9, 159);
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Sidebar() {
  return (
    <SidebarStyled>
      <Row style={{ flexShrink: 0, padding: "16px 16px 0" }}>
        <Col span={24}>
          <UserInfo />
        </Col>
      </Row>
      <Row style={{ flex: 1, overflow: "hidden", padding: "16px" }}>
        <Col span={24} style={{ height: "100%" }}>
          <div style={{ height: "100%", overflowY: "auto" }}>
            <RoomList />
          </div>
        </Col>
      </Row>
    </SidebarStyled>
  );
}
