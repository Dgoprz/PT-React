import { useContext } from 'react';
import classNames from 'classnames';
import Button from '../common/Button';
import AuthContext from '../auth/context';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';

function Header({ className }) {
  const { isLogged, handleLogout } = useContext(AuthContext);
  return (
    <header className={classNames('header', className)}>
       <Link to="/" className="header-menu-link">
        <div className="header-menu">
          Anuncios
        </div>
      </Link>
      <NavLink
          to="/adverts/new"
          activeClassName="header-menu"
          activeStyle={{ color: 'green' }}
        >
          <div className="header-menu">
             Crear Anuncio
          </div>
        </NavLink>
      <nav className="header-nav">
     
        
        {isLogged ? (
          <Button className="header-button" onClick={handleLogout}>
            Salir
          </Button>
        ) : (
          <Button
            variant="primary"
            className="header-button"
            as={Link}
            to="/login"
          >
            Entrar
          </Button>
        )}
      </nav>
    </header>
  );
}

export default Header;
