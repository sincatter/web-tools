// src/App.tsx
import React, { useState } from 'react';
import { mergeA5ToA4 } from './utils';
import './App.css';
import FooterInfo from '@/components/FooterInfo'; // 引入样式文件

const App: React.FC = () => {
  const [a5Files, setA5Files] = useState<File[]>([]);
  const [scale, setScale] = useState<string>('0.8');

  // 处理文件选择
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setA5Files(Array.from(files));
    }
  };

  // 缩放比例失焦校验
  const handleScaleBlur = () => {
    const value = parseFloat(scale);
    if (isNaN(value) || value <= 0.1 || value > 1) {
      alert('缩放比例必须在 0.1 到 1 之间');
      setScale('0.8');
    }
  };

  // 输入框值更新
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(e.target.value);
  };

  // 合并 A5 发票为 A4 PDF
  const handleMerge = async () => {
    if (a5Files.length === 0) {
      alert('请上传至少一个 A5 发票文件');
      return;
    }

    try {
      const pdfBytes = await mergeA5ToA4(a5Files, parseFloat(scale));

      // 创建下载链接
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'mergedA4.pdf';
      link.click();
    } catch (error) {
      alert('合并 PDF 时出错，请重试！');
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">A5 发票合并为 A4</h1>
      <div className="form-group">
        <label className="form-label">
          上传 A5 发票文件：
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="form-input"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          设置缩放比例：
          <input
            type="number"
            value={scale}
            onChange={handleScaleChange}
            onBlur={handleScaleBlur}
            step="0.05"
            min="0.1"
            max="1"
            className="form-input scale-input"
          />
          <span className="form-hint">(范围: 0.1 到 1)</span>
        </label>
      </div>

      <button onClick={handleMerge} className="merge-button">
        合并为 A4
      </button>

      {/* 使用 FooterInfo 组件 */}
      <FooterInfo />
    </div>
  );
};

export default App;
