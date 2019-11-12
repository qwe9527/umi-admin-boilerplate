import React from 'react';
import AsyncComponent from '@/components/AsyncComponent';

const AsyncAdd = AsyncComponent('@/components/Add');

export const columns = [
  {
    title: 'test',
    dataIndex: 'test'
  },
  {
    title: 'test1',
    dataIndex: 'test1'
  },
  {
    title: 'test2',
    dataIndex: 'test2'
  }
];

export const modalContentMap = {
  add: {
    title: '添加',
    content: (props) => <AsyncAdd {...props}/>,
  }
};
