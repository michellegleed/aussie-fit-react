import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Nav from './components/nav/nav';
import Dashboard from './pages/admin/dashboard';
import LoginPage from './pages/login';
import AttendancePage from './pages/attendance';
import QuestionsPage from './pages/questions';
import GroupDetail from './pages/admin/groupDetail';
import ParticipantDetail from './pages/admin/participantDetail';
import Footer from './components/footer/footer';

function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  const theme = {
    dark: {
      backgroundColor: "#222",
      color: "#fff"
    },
    light: {
      backgroundColor: "#fff",
      color: "#232323"
    }
  }

  const updateIsAdmin = (bool) => {
    setIsAdmin(bool);
  }

  return (
    <div className="App" style={isAdmin ? theme.light : theme.dark}>
      <Router>
        <Nav updateIsAdmin={updateIsAdmin} />
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
            <Route path="/admin/participant/:id">
              <ParticipantDetail />
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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
