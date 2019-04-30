import React from 'react';
import { connect } from 'dva';
import './index.less';
import {Menu, Dropdown, Avatar, Badge, Icon, Modal} from 'antd';
import Link from 'umi/link';
import defaultUserAvatar from '../../assets/avatar.jpg'
import {userMenuList, navSource} from './config';

const menuList = ({list = [], mode = 'vertical', selectedKeys, onClick}) => (
  <Menu onClick={onClick}
        selectedKeys={selectedKeys}
        mode={mode}>
    {
      list.map(({title, path, key}) => (
        <Menu.Item key={key}>
          {path ? <Link to={path}>{title}</Link> : title}
        </Menu.Item>
      ))
    }
  </Menu>
);

const Header = ({logout, userName='用户名', noReadCount, location}) => {
  const navData = navSource[`/${location.pathname.split('/')[1]}`] || {};
  const handleClick = ({key}) => {
    if (key === 'logout') {
      Modal.confirm({
        title: '提示',
        content: '确定退出登录吗？',
        onOk: logout
      });
    }
  };
  const userMenu = menuList({
    list: userMenuList,
    onClick: handleClick
  });
  const navMenu = menuList({
    list: navData.navs,
    mode: 'horizontal',
    selectedKeys: [location.query.type || navData.defaultNavKey]
  });
  return (
    <div className='header clearfix'>
      <div className='left'>
        <h1 className='title'>{navData.title}</h1>
        {
          navData.navs && (
            <div className='nav left'>{navMenu}</div>
          )
        }
      </div>
      <div className='right header-user'>
        <div className='left alert'>
          <Link to='/common?type=alertMsg'>
            <Badge count={noReadCount}>
              <Icon type='bell' style={{fontSize: 24, color: '#000'}}/>
            </Badge>
          </Link>
        </div>
        <div className='right' style={{marginTop: 8}}>
          <Dropdown overlay={userMenu}>
            <span className='username'>{userName} <Icon type='down' /></span>
          </Dropdown>
        </div>
        <div className='right' style={{marginTop: 2}}>
          <Avatar src={defaultUserAvatar} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({user, app, routing}) => ({
  userName: user.username,
  noReadCount: app.noReadCount,
  location: routing.location
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({type: 'user/fetchLogout'})
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
