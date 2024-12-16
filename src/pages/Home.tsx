// src/pages/Home.tsx
import React, { useState } from 'react';
import { Tool } from '@/types/Tool';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@styles/pages/Home.css';

// 假设这些数据来自后端或者本地文件
const tools: Tool[] = [
  { id: 1, name: 'A5ToA4', description: 'A5发票合并为A4文件', icon: 'assets/images/a5toa4.png', category: 'PDF处理', tags: ['PDF'], path: '/a5toa4' },
  // { id: 2, name: 'Tool 2', description: 'This is Tool 2', icon: '/assets/icons/tool2.png', category: 'Design', tags: ['tag2'], path: '/tool2' },
  // 更多工具数据...
];

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <div className="tool-list">
        {tools.map(tool => (
          <Card key={tool.id} tool={tool} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
