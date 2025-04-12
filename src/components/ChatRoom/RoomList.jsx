import React from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons";
import { AppContext } from "../Context/AppProvider";

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  color: rgb(153, 183, 245) !important;
  background: rgb(199, 254, 0);
  transition: all 0.2s ease;
  text-decoration: none !important;

  &:hover {
    background: rgba(255, 255, 255, 0.41);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }

  // Optional: Add icon alignment if needed
  .anticon {
    margin-right: 8px;
  }
`;
export default function RoomList() {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };

  // Danh sách items cho Collapse
  const items = [
    {
      key: "1",
      label: (
        <Typography.Text style={{ color: "white" }}>
          Danh sách các phòng
        </Typography.Text>
      ),
      children: (
        <>
          {rooms?.length > 0 ? (
            rooms.map((room) => (
              <LinkStyled
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
              >
                {room.name}
              </LinkStyled>
            ))
          ) : (
            <Typography.Text style={{ color: "white" }}>
              Không có phòng nào
            </Typography.Text>
          )}
        </>
      ),
    },
  ];

  const AddRoomButton = styled(Button)`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 16px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px dashed rgba(255, 255, 255, 0.3);
    color: #fff;
    transition: all 0.2s ease;
    margin-top: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    .anticon {
      font-size: 16px;
      margin-right: 8px;
    }
  `;

  // In your component return
  return (
    <>
      <Collapse ghost defaultActiveKey={["1"]} items={items} />
      <AddRoomButton onClick={handleAddRoom} icon={<PlusSquareOutlined />}>
        Thêm phòng
      </AddRoomButton>
    </>
  );
}
