import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Nav from './components/nav/nav';
import Dashboard from './pages/admin/dashboard/dashboard';
import LoginPage from './pages/login';
import AttendancePage from './pages/attendance';
import QuestionsPage from './pages/questions';
import GroupDetail from './pages/admin/groupDetail/groupDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Nav />
          <div id="main-container">
            <Switch>
              <Route path="/group/:id" >
                <AttendancePage />
              </Route>
              <Route path="/check-in" exact>
                <QuestionsPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/admin/:id">
                <GroupDetail />
              </Route>
              <Route path="/admin">
                <Dashboard />
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
