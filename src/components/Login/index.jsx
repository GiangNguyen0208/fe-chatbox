import React, { useState } from "react";
import { Row, Col, Button, Typography, message, Spin, Space } from "antd";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import {
  GoogleOutlined,
  FacebookFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { addDocument, generateKeywords } from "../firebase/services";

const { Title, Text } = Typography;

const fbProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export default function Login() {
  const [loading, setLoading] = useState(false);
  const auth = getAuth(); // Firebase v9

  const handleLogin = async (provider) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Kết quả đăng nhập:", result);

      const { user } = result;
      console.log("🆕 isNewUser:", user.isAnonymous); // Log trạng thái

      if (user.isAnonymous == false) {
        console.log("Người dùng mới, đang thêm vào Firestore...");
        await addDocument("users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: user.providerId,
          keywords: generateKeywords(user.displayName?.toLowerCase() || ""),
        });
        console.log("Document đã thêm vào Firestore!");
      }

      message.success(`Đăng nhập thành công! Chào mừng ${user.displayName}`);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      message.error("Đăng nhập thất bại! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "16px",
      }}
    >
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={8}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "40px 24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Title
            level={2}
            style={{
              color: "#1890ff",
              marginBottom: 8,
              fontWeight: 600,
              letterSpacing: "-0.5px",
            }}
          >
            Fun Chat
          </Title>
          <Text type="secondary">Chọn phương thức đăng nhập</Text>
        </div>

        <Space direction="vertical" style={{ width: "100%" }} size={16}>
          <Button
            size="large"
            icon={<GoogleOutlined />}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "#db4437",
              borderColor: "#db4437",
              fontWeight: 500,
            }}
            onClick={() => handleLogin(googleProvider)}
            disabled={loading}
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined style={{ color: "#fff" }} spin />}
              />
            ) : (
              "Đăng nhập bằng Google"
            )}
          </Button>

          <Button
            size="large"
            icon={<FacebookFilled />}
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "#3b5998",
              borderColor: "#3b5998",
              fontWeight: 500,
            }}
            onClick={() => handleLogin(fbProvider)}
            disabled={loading}
          >
            {loading ? (
              <Spin
                indicator={<LoadingOutlined style={{ color: "#fff" }} spin />}
              />
            ) : (
              "Đăng nhập bằng Facebook"
            )}
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
