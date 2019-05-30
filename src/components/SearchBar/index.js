import React from 'react';
import './index.less';
import {Select, Button, DatePicker, Input} from 'antd';
import moment from 'moment';

const {Option} = Select;
const { RangePicker } = DatePicker;
const rangePickerPlaceholder = ['开始时间', '结束时间'];

const SearchBar = (props) => {
  const {
    selectDeviceId,
    inputDeviceId,
    list = [],
    dateRange,
    showDatePicker,
    hideSelect,
    onChange,
    onClick,
    onDatePickerChange,
    onInputChange
  } = props;
  const ranges = {
    '最近一小时': [moment().subtract(1, 'h'), moment()],
    '最近一天': [moment().subtract(1, 'd'), moment()],
    '最近一周': [moment().subtract(1, 'w'), moment()],
    '最近一月': [moment().subtract(1, 'M'), moment()]
  };
  return (
     <div className='search-bar children'>
       {
         !hideSelect && (
           <Select
             value={selectDeviceId || undefined}
             className='input left'
             placeholder='设备名称'
             allowClear
             onChange={onChange}
           >
             {
               list.map(({deviceId, deviceName}) => (
                 <Option key={deviceId} value={deviceId}>{deviceName}</Option>
               ))
             }
           </Select>
         )
       }
       <Input
         className='input'
         placeholder='设备标识'
         value={inputDeviceId}
         onChange={onInputChange}
       />
       {
         showDatePicker && (
           <RangePicker
             showTime
             value={dateRange}
             className='picker'
             placeholder={rangePickerPlaceholder}
             ranges={ranges}
             onChange={onDatePickerChange}
           />
         )
       }
       <Button
         type='primary'
         className='right'
         onClick={onClick}
       >
         查询
       </Button>
     </div>
  );
};

export default SearchBar;
