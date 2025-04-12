import React from "react";
import { Row, Col } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatRoom() {
  return (
    // <-- Added return statement here
    <div style={{ height: "100vh", padding: "16px", backgroundColor: "#" }}>
      <Row gutter={[16, 0]} style={{ height: "100%" }}>
        <Col xs={24} sm={8} md={6} style={{ height: "100%" }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "16px",
              height: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Sidebar />
          </div>
        </Col>

        <Col xs={24} sm={16} md={18} style={{ height: "100%" }}>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <ChatWindow />
          </div>
        </Col>
      </Row>
    </div>
  ); // <-- Closing parenthesis for return statement
}
