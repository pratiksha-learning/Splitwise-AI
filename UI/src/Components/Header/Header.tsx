import React from 'react';
import './Header.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <div className="page-header-overlay">
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default Header;
