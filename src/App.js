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
            markerDataList: []
        }
    }
    
    // 获取地图标记的数据源
    getMarkerDataList = value => {
        this.setState({markerDataList: value})
    };
    
    componentDidMount() {
        
    }
    
    
    render() {
        
        let {allPlaceDataList, markerDataList} = this.state;
        return (
            <div className="App">
                <h1>常去景点图</h1>
                <main className='main'>
                    <FilterPlacePage
                        dataList={allPlaceDataList}
                        getFilterList={this.getMarkerDataList}
                    />
                    <MapPage
                        markerList={markerDataList}
                    />
                </main>
            </div>
        );
    }
}

export default App;