import React from 'react';
import {Modal} from 'antd';
import {filterDevice} from '../../utils/app';

const PageContent = (props) => {
  const {
    modalContentMap,
    onChange,
    modalType,
    onCancel,
    loading,
    dataSource,
    selectedRowKeys
  } = props;
  const modalContentProps = modalContentMap[modalType] || {};
  const modalVisible = !!modalContentProps.title;
  let contentProps, modalContent = null;
  if (modalVisible) {
    contentProps = {
      onChange,
      data: {},
      dataSource: filterDevice(dataSource, selectedRowKeys, 'id')
    };
    if (modalContentProps.dataAttrs) {
      modalContentProps.dataAttrs.forEach(value => contentProps.data[value] = props[value]);
    }
    modalContent = modalContentProps.content(contentProps);
  }
  return (
    <div className='main-content'>
      {props.children}
      <Modal keyboard={false}
             maskClosable={!!modalContentProps.maskClosable}
             visible={modalVisible}
             title={modalContentProps.title}
             width={modalContentProps.width}
             confirmLoading={loading}
             footer={modalContentProps.footer}
             onOk={this[modalContentProps.onOk]}
             onCancel={onCancel}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default PageContent;
