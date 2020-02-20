import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainPage from './pages/mainpage/main.page';
import UploadPage from './pages/uploadpage/upload.page';


function App() {
  return (
    <Router>
      <Switch>
          <Route path="/upload">
            <UploadPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
