/*
 * @Description: 根目录
 */
import code from './test.md';
import React, { Component } from "react";
import 'highlight.js/styles/default.css';

class App extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML = {{ __html: code }} />
    );
  }
}

export default App;