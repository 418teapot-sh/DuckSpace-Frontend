import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import DuckTalk from "./pages/DuckTalk";
import DuckTalkMyPage from "./pages/DuckTalkMyPage"; // 👈 마이페이지 import 추가!
import Display from "./pages/Display";
import PopupSchedule from "./pages/PopupSchedule";
import PopupWishlist from "./pages/PopupWishlist";
import Login from "./pages/Login";
import Chat from "./pages/Chat"; 

import PostTextPages from './pages/PostTextPages';
import PostExchangePages from './pages/PostExchangePages';
import DisplayList from './pages/displayPage/DisplayList';
import DisplayUpload from './pages/displayPage/DisplayUpload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ducktalk" element={<DuckTalk />} />
        <Route path="/chat" element={<Chat />} /> 

        
        {/* 덕톡 마이페이지(내가 쓴 글) 라우트 */}
        <Route path="/ducktalk/mypage" element={<DuckTalkMyPage />} />

        <Route path="/display" element={<Display />} />

        {/* 로그인 라우트 */}
        <Route path="/login" element={<Login />} />

        {/* 팝업 일정 및 위시리스트 라우트 */}
        <Route path="/popup" element={<PopupSchedule />} />
        <Route path="/popup/wishlist" element={<PopupWishlist />} />

        {/* 게시글 작성 경로 */}
        <Route path="/create/text" element={<PostTextPages />} />
        <Route path="/create/exchange" element={<PostExchangePages />} />

        {/* 장식장 관련 페이지 */}
        <Route path="/display/list" element={<DisplayList />} />
        <Route path="/display/upload" element={<DisplayUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;