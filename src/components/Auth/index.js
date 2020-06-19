import React from 'react';
import './index.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Input, Form, Button, Card, Row, Col, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import OIDC from './oidc';

function Auth(props) {
  const [method, setMethod] = React.useState({});

  const { title } = useSelector((state) => state.settings);

  React.useEffect(() => {
    var obj = {};

    window.location.search
      .split('?')
      .filter((each) => each.trim() !== '')
      .forEach((each) => {
        var temp = each.split('=');
        obj[temp[0]] = temp[1];
      });

    if (!obj['request']) {
      window.location.href =
        process.env.REACT_APP_KRATOS_PUBLIC_URL + '/self-service/browser/flows/' + props.flow;
    }

    fetch(
      process.env.REACT_APP_KRATOS_PUBLIC_URL +
        '/self-service/browser/flows/requests/' +
        props.flow +
        '?request=' +
        obj['request'],
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res.status);
        }
      })
      .then((res) => setMethod(res.methods))
      .catch((err) => {
        console.log(err);
        window.location.href =
          process.env.REACT_APP_KRATOS_PUBLIC_URL + '/self-service/browser/flows/' + props.flow;
      });
  }, [props.flow]);

  const withPassword = (values) => {
    var authForm = document.createElement('form');
    authForm.action = method.password.config.action;
    authForm.method = method.password.config.method;
    authForm.style.display = 'none';

    var identifierInput = document.createElement('input');
    identifierInput.name = props.flow === 'login' ? 'identifier' : 'traits.email';
    identifierInput.value = values.email;

    var passwordInput = document.createElement('input');
    passwordInput.name = 'password';
    passwordInput.value = values.password;

    var csrfInput = document.createElement('input');
    csrfInput.name = 'csrf_token';
    csrfInput.value = method.password.config.fields.find(
      (value) => value.name === 'csrf_token',
    ).value;

    authForm.appendChild(identifierInput);
    authForm.appendChild(passwordInput);
    authForm.appendChild(csrfInput);

    document.body.appendChild(authForm);

    authForm.submit();
  };

  return (
    <div className="auth">
      <Row className="header">
        <Col span={6}>
          <img alt="logo" className="logo" src={logo} />
        </Col>
        <Col span={18}>
          <span className="title">{title}</span>
        </Col>
      </Row>
      <Card
        actions={method.oidc ? [<OIDC config={method.oidc.config} />] : []}
        title={props.flow}
        style={{ width: 400 }}
      >
        <Form name="auth" onFinish={withPassword}>
          {method.password && method.password.config.errors ? (
            <Form.Item>
              {method.password.config.errors.map((item) => (
                <Alert message={item.message} type="error" />
              ))}{' '}
            </Form.Item>
          ) : null}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'Please input valid Email!' },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button form="auth" type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            {props.flow === 'login' ? (
              <Link to={'/auth/registration'}>Register now!</Link>
            ) : (
              <Link to={'/auth/login'}>Log In!</Link>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Auth;