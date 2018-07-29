import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import setMetaEl from './responsiveSetting/meta';
import setHtmlFont from './responsiveSetting/font';


let eventEl = 'orientationchange' in window ? 'orientationchange' : 'resize';

setMetaEl(document, window);
setHtmlFont()


document.addEventListener(eventEl, function () {
    setMetaEl(document, window);
    setHtmlFont()
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
