/**
 * @author duantao
 * @file APP
 * @date 2018/7/26
 */

import React, {Component} from 'react';
import './App.css';

import MapPage from './MapPage/MapPage';
import FilterPlacePage from './FilterPlacePage/FilterPlacePage';

class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            defaultMapSetting: {
                center: {
                    lat: 39.90872,
                    lng: 116.39748,
                },
                zoom: 13,
                mapTypeControl: false,
            },
            map: null,
            markerList: [],
            largeInfoWindow: new window.google.maps.InfoWindow(),
            bounds: new window.google.maps.LatLngBounds(),
            allPlaceDataList: [
                // 天安门
                {title: '天安门', code: 'tiananmen', count: 0, location: {lat: 39.90872, lng: 116.39748}},
                // 故宫
                {title: '故宫', code: 'gugong', count: 1, location: {lat: 39.916345, lng: 116.397155}},
                // 颐和园
                {title: '颐和园', code: 'yiheyuan', count: 2, location: {lat: 39.999982, lng: 116.275461}},
                // 圆明园
                {title: '圆明园', code: 'yuanmingyuan', count: 3, location: {lat: 40.008098, lng: 116.298215}},
                // 北京理工大学
                {title: '北京理工大学', code: 'beijingligongdaxue', count: 4, location: {lat: 39.964431, lng: 116.310319}},
            ],
        }
    }
    
    // 初始化地图
    initMap = () => {
        
        let map = new window.google.maps.Map(this.refs.map, this.state.defaultMapSetting);
        window.map = map;
        let markerList = this.getMarkerList(map);
        
        this.setMarkerInMap(markerList);
    };
    
    // 设置标记图标
    setMarkerIcon = color => {
        return new window.google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + color +
            '|40|_|%E2%80%A2',
            new window.google.maps.Size(21, 34),
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(10, 34),
            new window.google.maps.Size(21, 34));
    };
    
    // 获取标记列表
    getMarkerList = (map) => {
        
        let {allPlaceDataList} = this.state;
        
        let that = this;
        
        let markerList = [];
    
        let highlightedIcon = this.setMarkerIcon('ffff24');
        
        function icon(count) {
            let defaultIcon = null;
            switch (count) {
                case 0:
                    defaultIcon = that.setMarkerIcon('ff0000');
                    break;
        
                case 1:
                    defaultIcon = that.setMarkerIcon('ff00ff');
                    break;
        
                case 2:
                    defaultIcon = that.setMarkerIcon('ffffff');
                    break;
        
                case 3:
                    defaultIcon = that.setMarkerIcon('000000');
                    break;
        
                default:
                    defaultIcon = that.setMarkerIcon('0000ff');
        
            }
    
            return defaultIcon;
        }
    
        allPlaceDataList.forEach((markerData, index) => {
            let {title, location, code, count} = markerData;
            
            let marker = new window.google.maps.Marker({
                position: location,
                title,
                animation: window.google.maps.Animation.DAOP,
                id: index,
                icon: icon(count)
            });
            
            marker.code = code;
            marker.count = count;
            
            marker.addListener('click', () => {
                that.setInfoWindow(marker, map);
            });
    
            marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon)
            });
    
            marker.addListener('mouseout', function () {
                this.setIcon(icon(this.count))
            });
    
            markerList.push(marker);
        });
        
        this.setState({
            markerList
        });
        
        return markerList;
        
    };
    
    // 设置标记在地图上
    setMarkerInMap = (markerList, show = true) => {
        
        let {bounds} = this.state;
        let map = window.map;
        
        if (map) {
            if (show) {
                markerList.forEach(marker => {
                    marker.setMap(map);
                    bounds.extend(marker.position);
                    map.fitBounds(bounds);
                });
            }
            else {
                markerList.forEach(marker => {
                    marker.setMap(null);
                });
            }
        }
    };
    
    // 设置 infoWindow 框的信息
    setInfoWindow = (marker, map) => {
        
        let {largeInfoWindow} = this.state;
        
        if (largeInfoWindow.marker !== marker) {
            
            largeInfoWindow.setContent('数据请求中...');
            largeInfoWindow.marker = marker;
            
            this.getPlace(marker.code)
                .then(res => {
                    console.log('data => ', res)
                    
                    let {status, result} = res;
                    
                    if (status === 'Success') {
                        let contentString = `<div style="width: 300px;">
                                                <div class="title">景点名称: ${result.name}</div>
                                                <div class="location">
                                                    <p>坐标: lat: ${result.location.lat};</p>
                                                    <p style="text-indent: 32px">  lng: ${result.location.lng}</p>
                                                </div>
                                                <div class="url">URL: <a href="${result.url}">${result.url}</a></div>
                                                <div class="description">简介: ${result.abstract}</div>
                                            </div>`;
                        
                        largeInfoWindow.setContent(contentString);
                    }
                    else {
                        largeInfoWindow.setContent('请求失败...');
                    }
                    
                }, e => {
                    largeInfoWindow.setContent('请求出错...');
                });
            
            map.setCenter(marker.position);
            map.setZoom(14);
            
            largeInfoWindow.open(map, marker);
            largeInfoWindow.addListener('closeclick', function () {
                largeInfoWindow.marker = null;
            })
            
            
        }
    };
    
    // 第三方 API 接口
    getPlace = address => {
        return  window.$.ajax({
            url: `http://api.map.baidu.com/telematics/v3/travel_attractions?id=${address}&ak=8RgzSljDxpVDNe1Bal9Sz2VpAK0zcIcL&output=json`,
            type: "GET",
            dataType: "jsonp",
        });
    };
    
    setPlaceDataList = () => {
        
        let {markerList} = this.state;
        let filterPage = new FilterPlacePage();
        filterPage.getPlaceList(markerList);
    };
    
    
    // 获取地图标记的数据源
    getMarkerDataList = value => {
        let page = new MapPage();
        page.getMarkerDataList(value);
        this.setState({markerDataList: value})
    };
    
    
    
    componentDidMount() {
        this.initMap();
    }
    
    
    render() {
        
        let {markerList} = this.state;
        this.setPlaceDataList();
        
        return (
            <div className="App">
                <header>
                    <h1>常去景点图</h1>
                </header>
                <main className='main'>
                    <FilterPlacePage
                        dataList={markerList}
                        getFilterList={this.getMarkerDataList}
                    />
                    <div className='map-box'>
                        <div role='application' id='map' ref='map'></div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;