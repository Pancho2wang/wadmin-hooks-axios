import React from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { stringify } from 'querystring';
import './index.less';
import logo from '../../assets/images/logo.svg';
import { getStorage, setStorage } from '../../utils/storage';
import { fetch } from '../../services';

const { Header } = Layout;
const MenuItem = Menu.Item;

async function onLogout(props) {
  const {
    history,
    location: { pathname },
  } = props;
  const { code } = await fetch('sys.fakeAccountLogout');
  if (code === 0 || code === 401) {
    const appStorage = getStorage();
    setStorage({ ...appStorage, isLogin: false }, undefined, -1);
    history.replace(
      `/login?${stringify({
        redirect: pathname,
      })}`,
    );
  }
}

const menu = props => {
  return (
    <Menu>
      <MenuItem>
        <Button type="link" onClick={_ => onLogout(props)}>
          退出
        </Button>
      </MenuItem>
    </Menu>
  );
};

export default props => {
  return (
    <Header className="site-layout-background header" style={{ padding: 0 }}>
      <div className="right">
        <Dropdown overlay={menu(props)} placement="bottomRight">
          <div className="pr-15 user">
            <img src={logo} className="user-icon" alt="user-icon" />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
