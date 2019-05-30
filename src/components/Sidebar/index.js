import React from 'react';
import './index.less';
import NavLink from 'umi/navlink';
import {Tooltip} from 'antd';
import {IconFont} from '../IconFont';
import {navs} from './config';
import logo from '../../assets/logo.png';

const Sidebar = () => {
  const handleActive = (match, location) => {
    if (!match) {
      return false
    }
    return (location.pathname.indexOf(match.url) > -1 && match.url) || (location.pathname === match.url);
  };

  return (
    <div className='sider'>
      <Tooltip title='xxxxxx' placement="right">
        <div className='logo'>
          <img className='logo-img' alt='logo' src={logo} />
        </div>
      </Tooltip>
      <div className='navs'>
        {
          navs.map(({title, icon, path}) => (
            <NavLink to={path}
                     key={title}
                     activeClassName="active"
                     isActive={handleActive}>
              <Tooltip title={title} placement="right">
                <div className='nav-item'>
                  <IconFont type={icon} />
                </div>
              </Tooltip>
            </NavLink>
          ))
        }
      </div>
    </div>
  );
};

export default Sidebar;
