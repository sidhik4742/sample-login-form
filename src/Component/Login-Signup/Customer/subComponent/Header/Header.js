import React from 'react';
import {Nav, Navbar, NavDropdown, Badge} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './Header.css';

function Header({
  customerName,
  customerLoginStatus,
  setCustomerLoginStatus,
  setCustomerPageStatus,
  customerPageStatus,
  setCartStatus,
  cartStatus,
  setCustomerAccountStatus,
  cartCount,
}) {
  const history = useHistory();
  const logoutHandler = () => {
    // console.log("lgout function");
    setCustomerLoginStatus(false);
    setCustomerAccountStatus(false);
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerName');
    setCustomerPageStatus({
      ['DashboardPanel']: true,
      ['productList']: true,
      ['viewBook']: false,
    });
    history.push('/');
  };
  const logInHandler = () => {
    // console.log("lgout function");
    history.push('/login');
  };
  const LandingPage = () => {
    setCustomerPageStatus({
      ['DashboardPanel']: true,
      ['viewBook']: false,
      ['productList']: true,
      ['viewCart']: false,
    });
  };

  const cartRoot = () => {
    setCartStatus(false);
    history.push('/viewCart');
  };

  const AccountHandler = () => {
    setCustomerAccountStatus(true);
    history.push('/accountInfo');
  };

  return (
    <div className="headerComponent">
      <div className="header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand
            onClick={LandingPage}
            className="headerLogo"
            style={{cursor: 'pointer'}}
          >
            E-Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav>
              <NavDropdown
                menuAlign="right"
                title={
                  customerLoginStatus && customerName ? customerName : 'Login'
                }
                id="collasible-nav-dropdown"
              >
                {customerLoginStatus ? (
                  <div>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={AccountHandler}>
                      Account
                    </NavDropdown.Item>
                  </div>
                ) : (
                  <NavDropdown.Item onClick={logInHandler}>
                    Login
                  </NavDropdown.Item>
                )}
              </NavDropdown>
              <Nav.Link eventKey={2} href="/">
                Home
              </Nav.Link>
              {customerLoginStatus && cartStatus ? (
                <Nav.Link onClick={cartRoot}>
                  Cart<Badge variant="light">{cartCount}</Badge>{' '}
                </Nav.Link>
              ) : null}
              <Nav.Link eventKey={2} href="#memes">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
