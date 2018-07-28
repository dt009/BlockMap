/**
 * @author duantao
 * @file 地图组件
 * @date 2018/7/26
 */

import React, {Component} from 'react';
import './MapPage.css';
// import $ from 'jquery';



class MapPage extends Component {
    
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
        }
    }
    
    // 初始化地图
    initMap = () => {
        
        let map = new window.google.maps.Map(this.refs.map, this.state.defaultMapSetting);
        this.setState({map});
        return map
    };
    
    // 获取标记的数据
    getMarkerDataList = value => {
        console.log('value ===>>> ', value);
        this.getMarkerList(value)
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
    getMarkerList = markerDataList => {
        
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
        
    
        markerDataList.forEach((markerData, key) => {
            
            let {title, location, code, count} = markerData;
            let marker = new window.google.maps.Marker({
                position: location,
                title,
                animation: window.google.maps.Animation.DAOP,
                id: key,
                icon: icon(count)
            });
            marker.code = code;
            marker.count = count;
            
            marker.addListener('click', function () {
                that.setInfoWindow(this);
            });
            
            marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon)
            });
            
            marker.addListener('mouseout', function () {
                this.setIcon(icon(this.count))
            });
            
            markerList.push(marker);
        });
        
        this.setMarkerInMap(markerList);
    };
    
    // 设置 infoWindow 框的信息
    setInfoWindow = marker => {
        
        let {largeInfoWindow, map} = this.state;
        
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
                    
                });
            
            map.setCenter(marker.position);
            map.setZoom(14);
            
            largeInfoWindow.open(map, marker);
            largeInfoWindow.addListener('closeclick', function () {
                largeInfoWindow.marker = null;
            })
            
            
        }
    };
    
    // 设置标记在地图上
    setMarkerInMap = markerList => {
        
        let {bounds, map} = this.state;
    
        console.log('markerList =====>>> ', markerList);
        
        if (map) {
            markerList.forEach(marker => {
                marker.setMap(map);
                bounds.extend(marker.position);
                map.fitBounds(bounds);
            });
            
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
    
    componentDidMount() {
        this.initMap();
    }
    
    render() {
        return (
            <div className='map-box'>
                <div role='application' id='map' ref='map'></div>
            </div>
        )
    }
}

export default MapPage;
