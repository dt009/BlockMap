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
            },
            defaultMarkerListData: [
                // 天安门
                {title: '天安门', code: 'tiananmen', location: {lat: 39.90872, lng: 116.39748}},
                // 故宫
                {title: '故宫', code: 'gugong', location: {lat: 39.916345, lng: 116.397155}},
                // 颐和园
                {title: '颐和园', code: 'yiheyuan', location: {lat: 39.999982, lng: 116.275461}},
                // 圆明园
                {title: '圆明园', code: 'yuanmingyuan', location: {lat: 40.008098, lng: 116.298215}},
                // 北京理工大学
                {title: '北京理工大学', code: 'beijingligongdaxue', location: {lat: 39.964431, lng: 116.310319}},
            ],
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
        
        let {bounds} = this.state;
        
        if (show) {
            markerList.forEach(marker => {
                marker.setMap(map);
                bounds.extend(marker.position);
                map.fitBounds(bounds);
            })
        }
        else {
            markerList.forEach(marker => marker.setMap(null))
        }
    };
    
    getPlace = address => {
        window.$.ajax({
            url: `http://api.map.baidu.com/telematics/v3/travel_attractions?id=${address}&ak=8RgzSljDxpVDNe1Bal9Sz2VpAK0zcIcL&output=json`,
            type: "GET",
            dataType: "jsonp",
        }).then(res => {
            console.log('data ===>>> ', res)
        });
    };
    
    
    componentDidMount() {
        let map = this.initMap();
        let markerList = this.getMarkerList();
        
        this.setMarkerInMap(markerList, map);
        
        this.getPlace('beijingligongdaxue')
        
    }
    
    render() {
        return (
            <div className='map-box'>
                <div id='map' ref='map'></div>
                <div id='message'></div>
            </div>
        )
    }
}

export default MapPage;
