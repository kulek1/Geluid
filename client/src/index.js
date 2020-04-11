import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import MainView from './views/MainView';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainView />, document.getElementById('root'));
registerServiceWorker();
