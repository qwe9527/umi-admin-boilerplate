import React from 'react';
import {Modal, Table} from 'antd';
import {filterDevice} from '../../utils/app';
import Footer from '@/components/Footer';

const PageContent = (props) => {
  const {
    modalContentMap = {},
    onChange,
    modalType,
    onModalCancel,
    loading,
    dataSource = [],
    selectedRowKeys = [],
    columns = [],
    onRowSelected,
    onTableRow,
    pageSize,
    totalPage,
    curPage,
    totalName,
    showDownload,
    locale,
    onPaginationChange
  } = props;
  const modalContentProps = modalContentMap[modalType] || {};
  const modalVisible = !!modalContentProps.title;
  let contentProps, modalContent = null;
  if (modalVisible) {
    contentProps = {
      onChange,
      onModalCancel,
      onSubmit: props[modalContentProps.onOk],
      data: {},
      dataSource: filterDevice(dataSource, selectedRowKeys, 'id'),
      loading
    };
    if (modalContentProps.dataAttrs) {
      modalContentProps.dataAttrs.forEach(value => contentProps.data[value] = props[value]);
    }
    modalContent = modalContentProps.content(contentProps);
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onRowSelected,
  };
  return (
    <div className='page-content'>
      {props.children}
      <Table
        rowKey='id'
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        locale={locale}
        rowSelection={onRowSelected ? rowSelection : undefined}
        onRow={onTableRow}
      />
      <Modal keyboard={false}
             maskClosable={!!modalContentProps.maskClosable}
             visible={modalVisible}
             title={modalContentProps.title}
             width={modalContentProps.width}
             confirmLoading={loading}
             footer={modalContentProps.footer}
             onCancel={onModalCancel}>
        {modalContent}
      </Modal>
      {
        totalName && (
          <Footer
            showDownload={showDownload}
            totalName={totalName}
            pageSize={pageSize}
            total={totalPage}
            current={curPage}
            onChange={onPaginationChange}
            onShowSizeChange={onPaginationChange}
          />
        )
      }
    </div>
  );
};

export default PageContent;
