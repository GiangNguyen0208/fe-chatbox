import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/Context/AuthProvider";
import AppProvider from "./components/Context/AppProvider";
import AddRoomModal from "./components/Model/AddRoomModal";
import InviteMemberModal from "./components/Model/InviteMemberModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<ChatRoom />} path="/" />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
