import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Nav from './components/nav/nav';
import HomePage from './pages/homePage';
import Dashboard from './pages/admin/dashboard';
import LoginPage from './pages/login';

import AttendancePage from './pages/attendance';
import QuestionsPage from './pages/questions';
import GroupDetail from './pages/admin/groupDetail';
import ParticipantDetail from './pages/admin/participantDetail';
import Footer from './components/footer/footer';
import AdminLoginPage from './pages/admin/adminLogin';
import NotFound from './pages/notFound';

function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  const updateIsAdmin = (bool) => {
    setIsAdmin(bool);
  }

  return (
    <div className={`App ${isAdmin ? "light-theme" : "dark-theme"}`}>
      <Router>
        <Nav updateIsAdmin={updateIsAdmin} />
        <div id="main-container">
          <Switch>
            <Route path="/group/:id/login">
              <LoginPage />
            </Route>
            <Route path="/group/:id" >
              <AttendancePage />
            </Route>
            <Route path="/check-in" exact>
              <QuestionsPage />
            </Route>
            <Route path="/admin/participant/:id">
              <ParticipantDetail />
            </Route>
            <Route path="/admin/login">
              <AdminLoginPage />
            </Route>
            <Route path="/admin/:id">
              <GroupDetail />
            </Route>
            <Route exact path="/">
              <HomePage userIsAdmin={isAdmin} />
            </Route>
            <Route path="/">
              <NotFound />
            </Route>
            {/* <Route path="/unauthorized">
              <Unauthorized />
            </Route> */}
            {/* <Route path="/network-error">
              <NetworkError />
            </Route> */}
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
