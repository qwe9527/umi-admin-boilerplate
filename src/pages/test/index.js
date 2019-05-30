import React, { Component } from 'react';
import {connect} from 'dva';
import './index.less';
import {columns, modalContentMap} from './config';
import SearchBar from '@/components/SearchBar';
import PageContent from '@/components/PageContent';
import {Button} from 'antd';

class Test extends Component {

  setModalType = (modalType) => {
    this.props.changeState({modalType});
  };

  render() {
    const {
      modalType
    } = this.props;

    return (
      <PageContent
        modalType={modalType}
        columns={columns}
        modalContentMap={modalContentMap}
        onModalCancel={this.setModalType.bind(this, null)}
      >
        <div className='page-test'>
          <div className='top-bar'>
            <div className='left children'>
              <Button
                type='primary'
                onClick={this.setModalType.bind(this, 'add')}
              >
                添加
              </Button>
            </div>
            <SearchBar />
          </div>
        </div>
      </PageContent>
    );
  }
}

const mapStateToProps = ({test}) => ({
  modalType: test.modalType
});

const mapDispatchToProps = dispatch => ({
  changeState: payload => dispatch({type: 'test/change', payload})
});

export default connect(mapStateToProps, mapDispatchToProps)(Test);
