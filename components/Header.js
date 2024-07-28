import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const Header = () => {
  return (
    <ErrorBoundary>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">BlockchainNotary</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" exact activeClassName="active" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/verify" activeClassName="active" className="nav-link">Verify</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/notarize" activeClassName="active" className="nav-link">Notarize</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </ErrorBoundary>
  );
};

export default Header;