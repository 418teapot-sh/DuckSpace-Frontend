import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostTextPages from './pages/PostTextPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 접속 시 바로 잡담 글 작성 페이지가 뜨도록 설정 */}
        <Route path="/" element={<PostTextPages />} />
        {/* 상세 라우팅 경로 */}
        <Route path="/talk/create/text" element={<PostTextPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;