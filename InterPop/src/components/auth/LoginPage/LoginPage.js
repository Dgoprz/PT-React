import T from 'prop-types';
import { useState } from 'react';
import { FormField } from '../../common';
import Button from '../../common/Button';

import { login } from '../service';
import { AuthContextConsumer } from '../context';

import './LoginPage.css';

function LoginPage({ onLogin, history, location }) {
  const [value, setValue] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetError = () => setError(null);

  const handleChange = event => {
    setValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // call to api - send value
    setIsLoading(true);
    resetError();
    try {
      console.log(value);
      await login(value);
      setIsLoading(false);
      onLogin();
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">InterPop</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="email"
          className="loginForm-field"
          value={value.email}
          onChange={handleChange}
          autofocus
        />
        <FormField
          type="password"
          name="password"
          label="Contraseña"
          className="loginForm-field"
          value={value.password}
          onChange={handleChange}
        />
        {/* <input
          type="checkbox"
          onChange={event => console.log(event.target.checked)}
          checked={true}
        />
        <input type="file" onChange={event => console.log(event)} /> */}
        <Button
          className="loginForm-submit"
          type="submit"
          variant="primary"
          disabled={isLoading || !value.email || !value.password}
        >
          Entrar
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};


const ConnectedLoginPage = props => (
  <AuthContextConsumer>
    {auth => <LoginPage onLogin={auth.handleLogin} {...props} />}
  </AuthContextConsumer>
);

export default ConnectedLoginPage;
