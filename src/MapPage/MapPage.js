
/**
 * @author duantao
 * @file 地图组件
 * @date 2018/7/26
 */

import React, { Component } from 'react';
import './MapPage.css';


class MapPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            defaultMapSetting: {
                center: {
                    lat: 39.908715,
                    lng: 116.397389,
                },
                zoom: 11,
            },
            defaultMarkerListData: [
                // 家
                {title: 'My Home', location: {lat: 39.960276, lng: 116.462679}},
                // 公司
                {title: 'My Company', location: {lat: 39.95934, lng: 116.466588}},
                // 天安门
                {title: 'Tian An Men', location: {lat: 39.908715, lng: 116.397389}}
            ],
            map: null,
            markerList: [],
            largeInfoWindow: new window.google.maps.InfoWindow()
        }
    }
    
    // 初始化地图
    initMap = () => {
        
        let map = new window.google.maps.Map(this.refs.map, this.state.defaultMapSetting);
        
        this.setState({map});
        
        return map
    };
    
    setMarkerIcon = color => {
        return new window.google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +
            '|40|_|%E2%80%A2',
            new window.google.maps.Size(21, 34),
            new window.google.maps.Point(0, 0),
            new window.google.maps.Point(10, 34),
            new window.google.maps.Size(21,34));
    }
    
    // 获取标记列表
    getMarkerList = () => {
        let that = this;
        let {defaultMarkerListData} = this.state;
        
        let markerList = [];
        
        let defaultIcon = this.setMarkerIcon('0091ff');
        let highlightedIcon = this.setMarkerIcon('ffff24');
        
        defaultMarkerListData.forEach((markerData, key) => {
            
            let {title, location} = markerData;
            let marker = new window.google.maps.Marker({
                position: location,
                title,
                animation: window.google.maps.Animation.DAOP,
                id: key,
                icon: defaultIcon
            });
            
            marker.addListener('click', function () {
                that.setInfoWindow(this);
            });
            
            marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon)
            });
            
            marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon)
            });
            
            markerList.push(marker);
        });
        
        this.setState({
            markerList
        });
        
        return markerList;
        
    };
    
    setInfoWindow = marker => {
        
        let {largeInfoWindow, map} = this.state;
        
        if (largeInfoWindow.marker !== marker) {
            
            largeInfoWindow.setContent(marker.title);
            largeInfoWindow.marker = marker;
            largeInfoWindow.open(map, marker);
            largeInfoWindow.addListener('closeclick', function () {
                largeInfoWindow.marker = null;
            })
            
            
        }
    };
    
    // 设置标记在地图上
    setMarkerInMap = (markerList, map, show = true) => {
        
        if (show) {
            markerList.forEach(marker => marker.setMap(map))
        }
        else {
            markerList.forEach(marker => marker.setMap(null))
        }
    };
    
    
    componentDidMount() {
        let map = this.initMap();
        let markerList = this.getMarkerList();
    
        this.setMarkerInMap(markerList, map);
        
    }
    
    render() {
        return (
            <div className='map-box'>
                <div id='map' ref='map'></div>
            </div>
        )
    }
}

export default MapPage;
