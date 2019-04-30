/*
*document: ./src/pages/Login/login.ejs
* */

import React, {Component} from 'react';
import {connect} from 'dva';
import './index.less';
import logo from '../../assets/logo.png';
import {Form, Icon, Input, Button} from 'antd';

class Login extends Component {
  componentDidMount() {
    // 加载背景动画
    import('../../utils/bgMotion.js')
      .then(module => {
        module.default(window.jQuery);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

      }
    });
  };

  render() {
    const {
      form
    } = this.props;
    return (
      <div className='login'>
        <div id="login-bg">
          <canvas></canvas>
          <canvas></canvas>
          <canvas></canvas>
        </div>
        <div className='login-box'>
          <img src={logo} className='login-logo' />
          <h1 className='title margin-t-20 margin-b-40'>xxxxxx</h1>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <Form.Item>
              {form.getFieldDecorator('userName', {
                rules: [{ required: true, message: '用户名不能为空' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.35)' }} />} placeholder="用户名" />
              )}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [{ required: true, message: '密码不能为空' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.35)' }} />} type="password" placeholder="密码" />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='copyright'>
          Copyright © 2019 xxxxxxxx
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({type: 'user/login'})
});

const WrappedLogin = Form.create({ name: 'login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLogin);
