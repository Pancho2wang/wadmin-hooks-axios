import React from 'react';
import { HomeOutlined, UserOutlined, SettingFilled, LockOutlined } from '@ant-design/icons';

const icons = {
  HomeOutlined: <HomeOutlined />,
  UserOutlined: <UserOutlined />,
  SettingFilled: <SettingFilled />,
  LockOutlined: <LockOutlined />,
};

export const getIcon = key => icons[key];

export default icons;
