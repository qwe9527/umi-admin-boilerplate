import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

const PageLayout = (props) => {
  return (
    <div className='container'>
      <SideBar />
      <Header />
      <Scrollbars autoHide>
        <div className='main-content'>
          {props.children}
        </div>
      </Scrollbars>
    </div>
  );
};

export default PageLayout;
