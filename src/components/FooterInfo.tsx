// src/components/FooterInfo.tsx
import React from 'react';
import './FooterInfo.css';  // 引入CSS样式

const FooterInfo: React.FC = () => {
  return (
    <div className="footer-info">
      <p className="footer-text">
        Power by: <strong>sincatter</strong><br />
      </p>
      <p>
        Bug 反馈: <a href="https://github.com/sincatter/a5toa4/issues" target="_blank"
                     rel="noopener noreferrer">点击这里反馈</a>
      </p>
    </div>
  );
};

export default FooterInfo;
