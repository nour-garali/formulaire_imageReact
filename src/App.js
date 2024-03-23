import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';
import FundsList from './components/FundsList';
import UserList from './components/UserList';
import UpdateUser from './components/updatUser';
import UserProfileDashboard from './components/UserProfileDashboard'; // Importez le composant UserProfileDashboard

const App = () => {
  return (
    <AuthProvider> {/* AuthProvider englobe l'ensemble de l'application */}
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/listFund" component={FundsList} />
          <Route path="/UserList" component={UserList} />
          <Route path="/update/:id" component={UpdateUser} />
          <ProtectedRoute path="/profile" component={UserProfileDashboard} /> {/* Ajoutez cette ligne */}
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
