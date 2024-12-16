// src/components/Card.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '@/types/Tool';
import '@styles/components/Card.css'

interface CardProps {
  tool: Tool;
}

const Card: React.FC<CardProps> = ({ tool }) => {
  return (
    <div className="card">
      <Link to={tool.path} className="card-link">
        <div className="card-content">
          <img src={tool.icon} alt={tool.name} className="icon" />
          <div className="info">
            <h3 className="name">{tool.name}</h3>
            <p className="description">{tool.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
