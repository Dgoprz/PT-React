import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AdvertsPage, NewAdvertPage, AdvertPage } from './components/adverts';
import { LoginPage, PrivateRoute } from './components/auth';
import { useState } from 'react';
import { logout } from './components/auth/service';

import { AuthContextProvider } from './components/auth/context';
import Not404 from './components/Not404';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogout, handleLogin }}>
        <div className="app">
          <Switch>
            <Route
              path="/login"
           >
              {routeProps => <LoginPage {...routeProps}/>}
            </Route>
            {/* <Route path="/login" component={LoginPage} /> */}
            <PrivateRoute path="/adverts/new" component={NewAdvertPage} />
            <PrivateRoute path="/adverts/:advertId" component={AdvertPage} />
            <PrivateRoute path="/adverts" component={AdvertsPage} />
            <PrivateRoute exact path="/">
              <Redirect to="/adverts" />
            </PrivateRoute>
            <PrivateRoute path="/404" component={Not404}/>
              
            
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
       </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
