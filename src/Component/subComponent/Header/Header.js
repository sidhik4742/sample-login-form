import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Header.css";

function Header() {
  const history = useHistory();

  const logoutHandler = () => {
    // console.log("lgout function");
    localStorage.removeItem("token");
    history.push("/admin");
  };

  return (
    <div className="headerComponent">
      <div className="header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home" className="headerLogo">
            Elibaray
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
                title={"Admin"}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
