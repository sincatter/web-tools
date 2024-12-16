// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import A5ToA4 from '@/pages/A5ToA4';
// import ToolPage2 from '@pages/ToolPage2'; // 可以继续添加其他工具页面
import '@styles/global.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/a5toa4" element={<A5ToA4 />} />
        {/*<Route path="/tool2" element={<ToolPage2 />} />*/}
        {/* 更多工具页面 */}
      </Routes>
    </Router>
  );
};

export default App;
