import React, { Component } from "react";

import Search from "./containers/Search";

import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Search />
      </div>
    );
  }
}

export default App;
