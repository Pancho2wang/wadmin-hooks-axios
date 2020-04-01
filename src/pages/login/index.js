import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { parse } from 'querystring';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons';
import { fetch } from '../../services';
import { setStorage, getStorage } from '../../utils/storage';
import { getUUID } from '../../utils/utils';
import './index.less';

import logo from '../../assets/images/logo.svg';

const { Item: FormItem } = Form;

export default props => {
  const {
    history,
    location: { search },
  } = props;
  const { redirect } = parse(search.split('?')[1]);
  const appStorage = getStorage() || {};
  if (appStorage.isLogin) {
    return <Redirect to={redirect || '/'} />;
  }
  const { account } = getStorage('account') || {};
  const [isAccount, setIsAccount] = useState(!!account);
  const [type] = useState('account');
  const [uuid, setUUID] = useState();
  const [captcha, setCaptcha] = useState();
  const getCaptchaCode = useCallback(() => {
    const u = getUUID();
    setUUID(u);
    const captchaUrl = fetch('sys.getCaptchaCode', { uuid: u });
    setCaptcha(captchaUrl);
  }, []);

  useEffect(() => {
    getCaptchaCode();
  }, [getCaptchaCode]);

  async function onLogin(values) {
    let params = { ...values, type, uuid };
    if (isAccount) {
      params = { ...params, account };
    }
    params = { ...params, username: params.account, account: undefined };
    const { code, msg, ...ret } = await fetch('sys.fakeAccountLogin', params);
    if (code !== 0) {
      return getCaptchaCode();
    }
    if (params.remember) {
      setStorage({ account: params.username }, 'account');
    }
    setStorage({ ...params, password: undefined, isLogin: true, ...ret });
    history.replace(redirect || '/');
  }

  return (
    <div className="login">
      <div className="content">
        <div className="title">
          <img alt="logo" className="logo" src={logo} />
          <span className="title-text">App</span>
        </div>
        <Form
          name="normal_login"
          size="large"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onLogin}
        >
          {isAccount ? (
            <div className="login-user">
              <img alt="user-icon" className="user-icon" src={logo} />
              <div className="user-name">{account}</div>
              <Button type="link" onClick={_ => setIsAccount(false)}>
                切换账号
              </Button>
            </div>
          ) : (
            <FormItem name="account" rules={[{ required: true, message: '请输入您的账号!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
            </FormItem>
          )}

          <FormItem name="password" rules={[{ required: true, message: '请输入您的密码!' }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </FormItem>
          <FormItem>
            <Row gutter={8}>
              <Col span={12}>
                <FormItem
                  name="captcha"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码!' }]}
                >
                  <Input
                    prefix={<VerifiedOutlined className="site-form-item-icon" />}
                    maxLength={4}
                    placeholder="验证码"
                  />
                </FormItem>
              </Col>
              <Col span={10} offset={2}>
                <Button
                  type="link"
                  className="wh-100"
                  style={{ padding: 0 }}
                  onClick={getCaptchaCode}
                >
                  <img alt="captcha" className="wh-100" src={captcha} />
                </Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <FormItem name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </FormItem>
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            {/* <Row className="link">
              <Col span={12}>
                <Link to="/forgotpwd">忘记密码</Link>
              </Col>
              <Col span={12} className="text-right">
                <Link to="/register">去注册</Link>
              </Col>
            </Row> */}
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
