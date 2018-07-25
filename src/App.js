import React, {Component} from 'react';
import './App.css';

class App extends Component {
    
    componentDidMount() {
        
        new window.google.maps.Map(this.refs.map, {
            center: {
                lat: 39.95934,
                lng: 116.466588
            },
            zoom: 13,
        })
        
    }
    
    render() {
        return (
            <div className="App">
                <div ref="map" style={{width: '400px', height: '400px'}}></div>
            </div>
        );
    }
}

export default App;
