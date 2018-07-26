/**
 * @author duantao
 * @file APP
 * @date 2018/7/26
 */

import React, {Component} from 'react';
import './App.css';

import MapPage from './MapPage/MapPage';

class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            lat: 39.908715,
            lng: 116.397389,
            zoom: 11,
            
            defaultMarker: [
                // 家
                {title: 'My Home', location: {lat: 39.960276, lng: 116.462679}},
                // 公司
                {title: 'My Company', location: {lat: 39.95934, lng: 116.466588}},
                // 天安门
                {title: 'Tian An Men', location: {lat: 39.908715, lng: 116.397389}}
            ]
        }
    }
    
    componentDidMount() {
        
    }
    
    
    render() {
        
        let {lat, lng, zoom, defaultMarker} = this.state;
        return (
            <div className="App">
                <MapPage
                    defaultSet={{lat, lng, zoom}}
                    defaultMarker={defaultMarker}
                    />
            </div>
        );
    }
}

export default App;