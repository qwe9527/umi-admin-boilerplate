import React, {Component} from 'react';
import {connect} from 'dva';
import './index.less';

class Login extends Component {
  render() {
    return (
      <div className='login'>

      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
