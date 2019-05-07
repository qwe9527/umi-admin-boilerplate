import React, {Component} from 'react';
import {Spin, message, Input} from 'antd';
import './index.less';
import markerIcon from '../../assets/marker.png';
import markerGrayIcon from '../../assets/marker-gray.png'

const {Search} = Input;
let AMap;
const mapLoadingTip = '初始化中...';

class Map extends Component {

  state = {
    isLoading: true,
    resultList: [],
    showSearchResult: false
  };

  componentDidMount() {
    const aMap = document.getElementById('AMapScript');
    this.map = null;
    if (!aMap) {
      this.insertAMap();
    } else {
      this.aMapInit(this.props.viewMode);
    }
  }

  componentDidUpdate(prevProps) {
    const prevMarkers= prevProps.markers;
    const prevViewMode = prevProps.viewMode;
    const {markers, viewMode} = this.props;
    if (this.isMapComplete && prevMarkers !== markers) {
      this.setMarkers();
    } else if (prevViewMode !== viewMode) {
      this.aMapInit(viewMode);
    }
  }

  // 引入高德地图api
  insertAMap() {
    const script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0];
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('id', 'AMapScript');
    script.setAttribute('src', 'https://webapi.amap.com/maps?v=1.4.14&key=6cacdf9dae067b0082f4931dc479af0c');
    head.appendChild(script);
    script.addEventListener('load', this.handleAMapScriptLoad);
    this.aMapScriptEle = script;
  }

  handleAMapScriptLoad = () => {
    this.aMapScriptEle.removeEventListener('load', this.handleAMapScriptLoad);
    this.aMapInit(this.props.viewMode);
  };

  // 初始化高德地图
  aMapInit(viewMode = '2D') {
    AMap = window.AMap;
    this.map = new AMap.Map('AMap', {
      rotateEnable: true,
      resizeEnable: true,
      jogEnable: false,
      keyboardEnable: false,
      animateEnable: false,
      pitchEnable:true,
      zoom: 16,
      viewMode,
      pitch: 60,
      buildingAnimation:true,
      expandZoomRange:true,
      zooms:[3,20],
    });
    this.map.plugin(['AMap.Scale', 'AMap.Geolocation', 'AMap.DistrictSearch', 'AMap.Autocomplete', 'AMap.Geocoder', 'AMap.ControlBar', 'AMap.GltfLoader'], () => {
      const {onMoveEnd = () => {}, onComplete = () => {}} = this.props;
      new AMap.DistrictSearch({
        level: 'city',
        showbiz: false,
      });
      this.geolocation = new AMap.Geolocation({
        showButton: false,
      });
      this.geocoder = new AMap.Geocoder({
        radius: 100
      });
      this.auto = new AMap.Autocomplete({});
      this.map.addControl(new AMap.Scale());
      this.map.addControl(this.geolocation);
      if (viewMode === '3D') {
        const control = new AMap.ControlBar({
          showZoomBar: false,
          showControlButton:true,
          position: {
            right:'10px',
            top:'10px'
          }
        });
        this.map.addControl(control);
      }

      this.map.on('moveend', (e) => {
        onMoveEnd();
        if (!this.isInitInstallInfo) {
          this.handleGeocoder();
        } else {
          this.isInitInstallInfo = false;
        }
      });

      this.map.on('complete', () => {
        onComplete();
        this.setState({isLoading: false});
        this.isMapComplete = true;
        this.canFitView = true;
        this.setMarkers();
      });
    });
  }

  // 坐标转地址
  handleGeocoder() {
    if (this.props.onPosChange) {
      const center = this.map.getCenter();
      clearTimeout(this.geocoderTimer);
      this.geocoderTimer = setTimeout(() => {
        this.geocoder.getAddress([center.lng, center.lat], (status, res) => {
          if (status === 'complete') {
            const {regeocode = {}} = res,
              {formattedAddress} = regeocode;
            this.props.onPosChange({
              address: formattedAddress,
              longitude: `${center.lng}`,
              latitude: `${center.lat}`
            });
          }
        });
      }, 0);
    }
  }

  handleMapToolClick = (e) => {
    const type = e.target.getAttribute('data-type');
    if (type === 'out') {
      // 放大
      this.map.zoomOut();
    } else if (type === 'in') {
      // 缩小
      this.map.zoomIn();
    } else if (type === 'loc') {
      // 定位
      this.moveToLocate();
    }
  };

  // 获取当前定位，并将地图中心移到当前定位点
  moveToLocate() {
    const loadingMsg = message.loading('定位中...', 0);
    this.geolocation.getCurrentPosition((status) => {
      loadingMsg();
      if (status === 'error') {
        message.error('定位失败');
      }
    });
  }

  handleSearch = (e) => {
    const {value} = e.target;
    this.auto.search(value, (status, res) => {
      if (status === 'complete' || status === 'no_data') {
        const {tips = []} = res;
        this.setState({resultList: tips, showSearchResult: tips.length > 0});
      }
    });
  };

  showSearchResult = () => {
    const showSearchResult = this.state.resultList.length > 0;
    this.setState({showSearchResult});
  };

  hideSearchResult = () => {
    setTimeout(() => this.setState({showSearchResult: false}), 300);
  };

  handleChooseSearchValue = (location) => {
    this.map.setCenter([location.lng, location.lat]);
    this.hideSearchResult()
  };

  setMarkers = () => {
    const {markers = []} = this.props;
    const newMarkers = markers.filter(({longitude, latitude}) => longitude && latitude);
    this.map.clearMap();
    const markerObjs = [];
    newMarkers.forEach(({longitude, latitude, title, deviceId, deviceName, status}, index) => {
      const marker = new AMap.Marker({
        position: [longitude, latitude],
        icon: new AMap.Icon({
          imageSize: new AMap.Size(25, 25),
          image: status === 'true' ? markerIcon : markerGrayIcon
        }),
        title: `设备标识 : ${deviceId}\n设备名称 : ${deviceName}`
      });
      markerObjs.push(marker);
      marker.on('click', () => this.handleMarkerClick(deviceId, index));
    });
    this.map.add(markerObjs);
    this.markerObjs = markerObjs;
    if (this.canFitView) {
      this.canFitView = false;
      this.map.setFitView();
    }
  };

  handleMarkerClick = (deviceId, index) => {
    const marker = this.markerObjs[index];
    const {lng, lat} = marker.getPosition();
    this.map.setZoom(18);
    this.map.panTo([lng, lat]);
    if (this.props.onMarkerClick) {
      this.props.onMarkerClick(deviceId);
    }
  };

  render() {
    const {isLoading, resultList, showSearchResult} = this.state;
    const {
      hideTool,
      hideSearchBar,
      children
    } = this.props;
    return (
      <div className='aMap'>
        <Spin spinning={isLoading} size="large" tip={mapLoadingTip}>
          <div id='AMap'></div>
        </Spin>
        {
          !isLoading && (
            <div className='aMap-children'>
              {children}
              {
                !hideSearchBar && (
                  <div className='aMap-search'>
                    <Search
                      placeholder='搜索地点'
                      onChange={this.handleSearch}
                      onFocus={this.showSearchResult}
                      onBlur={this.hideSearchResult}
                      enterButton
                    />
                    {
                      showSearchResult && (
                        <ul className='result'>
                          {
                            resultList.map(({id, name, district, location}) => (
                              <li
                                className='value'
                                key={id || name}
                                onClick={this.handleChooseSearchValue.bind(this, location)}>
                                {name} - {district}
                              </li>
                            ))
                          }
                        </ul>
                      )
                    }
                  </div>
                )
              }
              {
                !hideTool && (
                  <div className='aMap-tool'>
                    <div className='loc' onClick={this.handleMapToolClick}>
                      <svg data-type='loc' className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                           p-id="5112" width="200" height="200">
                        <defs>
                        </defs>
                        <path
                          data-type='loc'
                          d="M639.297829 382.7712c-17.2032-17.173943-37.829486-30.954057-60.328229-40.257829-22.498743-9.303771-46.811429-14.1312-71.153371-14.1312-24.341943 0-48.683886 4.827429-71.153371 14.1312-22.498743 9.303771-43.125029 23.054629-60.328229 40.257829-17.2032 17.173943-30.983314 37.800229-40.316343 60.240457-9.303771 22.469486-14.160457 46.752914-14.160457 71.0656 0 24.312686 4.827429 48.596114 14.160457 71.0656 9.303771 22.469486 23.083886 43.066514 40.316343 60.240457 17.2032 17.173943 37.829486 30.954057 60.328229 40.257829 22.469486 9.303771 46.811429 14.1312 71.153371 14.1312 24.341943 0 48.654629-4.827429 71.153371-14.1312 22.469486-9.303771 43.125029-23.054629 60.328229-40.257829 17.2032-17.173943 30.983314-37.770971 40.287086-60.240457 9.303771-22.440229 14.160457-46.752914 14.160457-71.0656 0-24.312686-4.856686-48.596114-14.160457-71.0656C670.3104 420.571429 656.530286 399.9744 639.297829 382.7712zM918.557257 467.529143c-16.647314-199.533714-162.962286-348.3648-362.788571-362.203429L555.768686 0l-85.4016 0 0 106.7008C276.128914 124.693943 122.090057 272.149943 105.442743 467.529143L0 467.529143l0 87.127771 105.442743 0c16.647314 195.3792 168.842971 343.2448 363.081143 362.642286L468.523886 1024l87.215543 0 0-105.325714c199.797029-13.867886 346.141257-164.512914 362.788571-364.046629L1024 554.627657 1024 467.529143 918.557257 467.529143zM512 847.082057c-184.5248 0-334.848-151.464229-334.848-334.379886 0-182.915657 151.698286-336.223086 334.848-336.223086 184.554057 0 334.848 153.307429 334.848 336.223086C846.848 695.588571 696.5248 847.082057 512 847.082057z"
                          p-id="5113">
                        </path>
                      </svg>
                    </div>
                    <div className='scale'>
                      <div className='in' data-type='in' onClick={this.handleMapToolClick}></div>
                      <div className='out' data-type='out' onClick={this.handleMapToolClick}></div>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default Map;
