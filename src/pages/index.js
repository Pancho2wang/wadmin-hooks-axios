import React from 'react';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { Button } from 'antd';
import './index.less';
import logo from '../assets/images/logo.svg';

export default function(props) {
  const { history } = props;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="primary">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <nav>
          <Link to="/index">Home</Link>
          <br />
          <Link to="/demo">demo</Link>
          <br />
          <Link to="/login">login</Link>
          <hr />
        </nav>
        <Button type="primary" onClick={_ => mutate('getDemo')}>
          按钮
        </Button>
        <Button type="primary" onClick={_ => history.push('/demo')}>
          Demo
        </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
