import 'babel-polyfill';
import 'url-search-params-polyfill';
import 'whatwg-fetch'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index_dark.css';
import App from './App';
import l18n from './translations';
import db from './data';


let themeParam = null;

initParams(); 
start();

function start(){
  l18n.init();
  document.title = l18n.pageTitle;
  if (themeParam !== "white") document.body.className="dark";

  db.initFake();
  ReactDOM.render(<App />, document.getElementById('root'));

  // db.init().then(() => {
  //   ReactDOM.render(<App />, document.getElementById('root'));
  // });
}

function initParams(){
  const urlParams = new URLSearchParams(window.location.search);
  themeParam = urlParams.get("theme");
}