/*
 * @Description: 根目录
 */
import React, { Component } from "react";
import { HashRouter, Link, Route, NavLink } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/About";
import Footer from "pages/Footer";
const activeStyle = {
  fontWeight: "bold",
  color: "red",
};
window.addEventListener('popstate',function(e){
  console.log('我监听到数据的改变');
  console.log(e);
})
class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <NavLink
            className="link"
            to="/home"
            activeStyle={activeStyle}
          >
            首页
          </NavLink>
          <NavLink
            className="link"
            to="/about"
            activeStyle={activeStyle}
          >
            关于
          </NavLink>
          <Route path="/home/:id?" component={Home} />
          <Route path="/about" component={About} />
          <Route component={Footer} />
        </HashRouter>
      </div>
    );
  }
}

export default App;
