import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostTextPages from './pages/PostTextPages';
import PostExchangePages from './pages/PostExchangePages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 접속 시 교환 글 작성 페이지로 이동 */}
        <Route path="/" element={<Navigate to="/create/exchange" replace />} />

        {/* 깔끔한 2개 경로 */}
        <Route path="/create/text" element={<PostTextPages />} />
        <Route path="/create/exchange" element={<PostExchangePages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;