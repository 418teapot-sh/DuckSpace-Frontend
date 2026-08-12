
import { useState } from 'react'

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Search from "./pages/Search";
import DuckTalk from "./pages/DuckTalk";
import Display from "./pages/Display";

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostTextPages from './pages/PostTextPages';
import PostExchangePages from './pages/PostExchangePages';
import DisplayList from './pages/displayPage/DisplayList';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ducktalk" element={<DuckTalk />} />
        <Route path="/display" element={<Display />} />

        {/* 깔끔한 2개 경로 */}
        <Route path="/create/text" element={<PostTextPages />} />
        <Route path="/create/exchange" element={<PostExchangePages />} />

        {/* 장식장 굿즈 선택 페이지 */}
        <Route path="/display/list" element={<DisplayList />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;