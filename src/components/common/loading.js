import React from 'react';
import './index.less';
import logo from '../../assets/images/logo.svg';

export default function(props) {
  const { active } = props;
  return (
    <div className={`loading ${active ? 'active' : ''}`}>
      <header className="loading-header">
        <img src={logo} className="loading-logo" alt="logo" />
      </header>
    </div>
  );
}
