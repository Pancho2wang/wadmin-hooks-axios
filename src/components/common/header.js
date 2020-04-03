import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined, LockOutlined } from '@ant-design/icons';
import { stringify } from 'querystring';
import './index.less';
import logoAvatar from '../../assets/images/logo.svg';
import { getStorage, setStorage } from '../../utils/storage';
import { useStore } from '../../utils/store';
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

function onOpenResetPasswordModal(props) {
  console.log('1111');
}

const menu = props => {
  const { onMenuClick } = props;
  return (
    <Menu onClick={onMenuClick}>
      <MenuItem key="resetPassword">
        <LockOutlined />
        <span>修改密码</span>
      </MenuItem>
      <MenuItem key="logout">
        <LogoutOutlined />
        <span>退出</span>
      </MenuItem>
    </Menu>
  );
};

export default props => {
  const [state] = useStore('global');
  const { user } = state;
  function onMenuClick(values) {
    const { key } = values;
    switch (key) {
      case 'logout':
        return onLogout(props);
      case 'resetPassword':
        return onOpenResetPasswordModal(props);
      default:
        break;
    }
  }
  return (
    <Header className="site-layout-background header" style={{ padding: 0 }}>
      <div className="right">
        <Dropdown overlay={menu({ onMenuClick })} placement="bottomRight">
          <span className="action account">
            <Avatar size="small" className="avatar" src={user.avatar || logoAvatar} alt="avatar" />
            <span className="name">{user.username}</span>
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};
