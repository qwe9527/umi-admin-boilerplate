import React, {Component} from 'react';
import Chimee from 'chimee';
import hls from 'chimee-kernel-hls';
import Controlbar from 'chimee-plugin-controlbar';
import popup from 'chimee-plugin-popup';
import {Spin} from 'antd';
import moment from 'moment';
// import chimeePluginCenterState from 'chimee-plugin-center-state';

Chimee.install(Controlbar);
// Chimee.install(chimeePluginCenterState);

class VideoPlayer extends Component {

  state = {
    loading: true
  };

  componentDidMount() {
    this.initPlayer();
  }

  componentDidUpdate(prevProps) {
    const {popups: prevPopups, url: prevUrl} = prevProps;
    const {popups, url} = this.props;
    if (prevPopups !== popups) {
      popups.forEach((value) => {
        Chimee.install(value);
        this.player.use(value.name);
      });
    }
    if (prevUrl !== url) {
      this.player.load(url);
    }
  }

  componentWillUnmount() {
    this.player.destroy();
    clearInterval(this.timer);
  }

  initPlayer = () => {
    const {url, videoId, popups, onDetailClick, deviceId} = this.props;
    const popupsNames = [];
    popups.forEach((value) => {
      Chimee.install(value);
      popupsNames.push(value.name);
    });

    this.player = new Chimee({
      wrapper: `#${videoId}`,
      src: url,
      controls: true,
      autoplay: true,
      isLive: true,
      volume: 0,
      plugin: [
        Controlbar.name,
        // chimeePluginCenterState.name,
        ...popupsNames
      ],
      box: 'hls',
      kernels: {
        hls
      }
    });
    this.player.play();
    this.player.on('error', () => {
      if (this.state.loading) {
        this.setState({loading: false});
      }
      this.player.play();
    });
    this.player.on('click', (e) => {
      const {target} = e;
      const dataType = target.getAttribute('data-type');
      const dataIndex = target.getAttribute('data-index');
      if (dataType === 'videoDetail' && onDetailClick) {
        onDetailClick(dataIndex);
      }
    }, {
      target: 'container'
    });
    this.player.on('canplay', (e) => {
      if (this.state.loading) {
        this.setState({loading: false});
      }
    });
    if (deviceId === '500123') {
      this.createTimeInfo();
    }
  };

  createTimeInfo = () => {
    const time = popup({
      name: 'timeInfo',
      className: 'video-popup video-popup-transparent video-time',
      offset: '2% 0',
      title: false,
      body: moment().format('YYYY年MM月DD日 dddd HH:mm:ss'),
    });
    Chimee.install(time);
    this.player.use(time.name);
    this.timer = setInterval(() => {
      this.player.timeInfo.$dom.querySelector('cm-pp-body').innerHTML = moment().format('YYYY年MM月DD日 dddd HH:mm:ss');
    }, 1000);
  };

  render() {
    const {
      videoId = 'video-wrap',
      className,
      onClick
    } = this.props;
    const {loading} = this.state;
    return (
      <Spin spinning={loading} wrapperClassName='video-spin'>
        <div
          id={videoId}
          style={{height: '100%', width: '100%'}}
          className={className}
          onClick={onClick}
        >
        </div>
      </Spin>
    );
  }
}

export default VideoPlayer;
