import React, { useState } from "react";
import { Row, Col, Button, Typography, message, Spin } from "antd";
import firebase, { auth } from '../firebase/config';
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDocument, generateKeywords } from "../firebase/services";

const { Title } = Typography;

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
    <Row justify="center" style={{ height: "100vh", alignItems: "center" }}>
      <Col span={8} style={{ textAlign: "center" }}>
        <Title level={3}>Fun Chat</Title>
        <Button 
          type="primary" 
          style={{ width: "100%", marginBottom: 10 }} 
          onClick={() => handleLogin(googleProvider)} 
          disabled={loading}
        >
          {loading ? <Spin /> : "Đăng nhập bằng Google"}
        </Button>
        <Button 
          type="primary" 
          style={{ width: "100%" }} 
          onClick={() => handleLogin(fbProvider)} 
          disabled={loading}
        >
          {loading ? <Spin /> : "Đăng nhập bằng Facebook"}
        </Button>
      </Col>
    </Row>
  );
}
