import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import DuckTalk from "./pages/DuckTalk";
import DuckTalkMyPage from "./pages/DuckTalkMyPage"; 
import DuckTalkUserPage from "./pages/DuckTalkUserPage"; // 👈 다른사람 프로필 페이지 import
import Display from "./pages/Display";
import PopupSchedule from "./pages/PopupSchedule";
import PopupWishlist from "./pages/PopupWishlist";
import Login from "./pages/Login";
import Chat from "./pages/Chat"; 

import ChatRoom from "./pages/chatPage/ChatRoom"; 

import PostTextPages from './pages/PostTextPages';
import PostExchangePages from './pages/PostExchangePages';
import DisplayList from './pages/displayPage/DisplayList';
import DisplayUpload from './pages/displayPage/DisplayUpload';

import LoginRoute from "./components/LoginRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute> <Home /> </LoginRoute>} />
        <Route path="/search" element={<LoginRoute> <Search /> </LoginRoute>} />
        <Route path="/ducktalk" element={<LoginRoute> <DuckTalk /> </LoginRoute>} />
        <Route path="/chat" element={<LoginRoute> <Chat /> </LoginRoute>} />

        <Route path="/chat/:roomId" element={<LoginRoute> <ChatRoom /> </LoginRoute>} />

        {/* 덕톡 마이페이지(내가 쓴 글) 라우트 */}
        <Route path="/ducktalk/mypage" element={<LoginRoute> <DuckTalkMyPage /> </LoginRoute>} />

        {/* 덕톡 다른사람 프로필 라우트 👈 추가! */}
        <Route path="/ducktalk/user" element={<LoginRoute> <DuckTalkUserPage /> </LoginRoute>} />

        <Route path="/display" element={<LoginRoute> <Display /> </LoginRoute>} />

        {/* 로그인 라우트 */}
        <Route path="/login" element={<Login />} />

        {/* 팝업 일정 및 위시리스트 라우트 */}
        <Route path="/popup" element={<LoginRoute> <PopupSchedule /> </LoginRoute>} />
        <Route path="/popup/wishlist" element={<LoginRoute> <PopupWishlist /> </LoginRoute>} />

        {/* 게시글 작성 경로 */}
        <Route path="/create/text" element={<LoginRoute> <PostTextPages /> </LoginRoute>} />
        <Route path="/create/exchange" element={<LoginRoute> <PostExchangePages /> </LoginRoute>} />

        {/* 장식장 관련 페이지 */}
        <Route path="/display/list" element={<LoginRoute> <DisplayList /> </LoginRoute>} />
        <Route path="/display/upload" element={<LoginRoute> <DisplayUpload /> </LoginRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;