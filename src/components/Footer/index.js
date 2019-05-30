import React from 'react';
import './index.less';
import {Pagination, Button, Tooltip} from 'antd';

const pageSizeOptions = ['10', '20', '50', '100'];
const defaultPaginationConfig = {
  showQuickJumper: true,
  showSizeChanger: true,
  total: 0,
  current: 1,
  pageSize: 10,
  pageSizeOptions
};

const Footer = ({showDownload = true, onExport, totalName, ...props}) => {
  const handleShowTotal = (total) => `${totalName || '总设备数'}: ${total}`;
  return (
     <div className='clearfix footer-pagination margin-b-10 margin-t-10'>
       <div className="right">
         {
           showDownload && (
             <Tooltip title="导出全部数据" placement="top">
               <Button className='btn-download' icon="download" size="small" onClick={onExport}/>
             </Tooltip>
           )
         }
         <Pagination className="pagination"
                     {...defaultPaginationConfig}
                     showTotal={handleShowTotal}
                     {...props} />
       </div>
     </div>
  );
};

export default Footer;
