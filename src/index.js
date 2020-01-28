import React from 'react';
import ReactDOM from 'react-dom';

import bootstrap from 'bootstrap'; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; 

import './assets/css/font-awesome.min.css'; //Template Rubik
import './assets/css/argon.min.css'; // Template Rubik
import './assets/css/main.css'; // Template Rubik

import './index.css'; // Personalizacion provisional

// import './assets/js/jquery.min.js';
// import $ from 'jquery';
// import './assets/js/bootstrap.bundle.min.js';
// import './assets/js/js.cookie.js';
// import './assets/js/jquery.scrollbar.min.js';
// import './assets/js/jquery-scrollLock.min.js';
// import './assets/js/argon.min.js';




import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

