// src/types/Tool.ts
export interface Tool {
  id: number;
  name: string;
  description: string;
  icon: any;
  category: string;
  tags: string[];
  path: string; // 对应的工具页面路径
}
