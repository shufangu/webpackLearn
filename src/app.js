/*
 * @Description: 根目录
 */
import React, { Component } from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import Home from 'pages/Home';
import About from 'pages/About';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Link className="link" to="/home">首页</Link>
          <Link className="link" to="/about">关于</Link>
          <Route path="/home/:id?" component={Home} />
          <Route path="/about" component={About} />
        </HashRouter>
      </div>
    );
  }
}

export default App;