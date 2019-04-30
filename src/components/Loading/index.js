import React from 'react';
import styles from './index.css';
import {Spin} from 'antd';

const Loading = () => {
  return <div className={styles.loading}>
    <div className={styles.mask}></div>
    <div className={styles.spin}><Spin size="large" /></div>
  </div>;
};

export default Loading;
