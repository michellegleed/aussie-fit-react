import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import AttendancePage from './pages/attendance';
import QuestionsPage from './pages/questions';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/* <Nav /> */}
          <div id="main-container">
            <Switch>
              <Route path="/" exact>
                <AttendancePage />
              </Route>
              <Route path="/check-in" exact>
                <QuestionsPage />
              </Route>
              <Route path="/login">
                {/* <LoginPage /> */}
              </Route>
              <Route path="/unauthorized">
                {/* <Unauthorized /> */}
              </Route>
              <Route path="/network-error">
                {/* <NetworkError /> */}
              </Route>
              <Route path="/">
                {/* <NotFound /> */}
              </Route>
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
