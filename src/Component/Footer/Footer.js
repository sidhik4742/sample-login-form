import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>
          © 2020 Login Form . All Rights Reserved | Template by
          <a href="https://personal-websiteserver.herokuapp.com/">
            {" "}
            S@R Creation
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
