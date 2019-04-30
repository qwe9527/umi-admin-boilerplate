import React from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

const PageLayout = (props) => {
  return (
    <LocaleProvider locale={zh_CN}>
      <div className='container'>
        <SideBar />
        <Header />
        <Scrollbars autoHide>
          <div className='main-content'>
            {props.children}
          </div>
        </Scrollbars>
      </div>
    </LocaleProvider>
  );
};

export default PageLayout;
