import React, { Component } from "react";
import Menu from "./components/menu/menu";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routers from "./routers";
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          {/* Nội dung  */}
          <Switch>{this.showContent(Routers)}</Switch>
        </div>
      </Router>
    );
  }
  showContent = (Routers) => {
    var results = null;
    if (Routers.length > 0) {
      results = Routers.map((router, index) => {
        return (
          <Route
            key={index}
            path={router.path}
            exact={router.exact}
            component={router.main}
          />
        );
      });
    }
    return results;
  };
}

export default App;
