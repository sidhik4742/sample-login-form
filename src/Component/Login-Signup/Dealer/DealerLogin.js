import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../Login.css";
import axios from "axios";

function DealerLogin({ setdealerLoginCrentials, dealerLoginCrentials }) {
  const history = useHistory();
  const [dealerLogin, setDealerLogin] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("dealerToken");
    if (token) {
      history.push("/dealer/dashboard");
    } else {
      history.push("/dealer");
    }
  });

  const changeHandler = (event) => {
    setDealerLogin({
      ...dealerLogin,
      [event.target.name]: event.target.value,
    });
  };

  const submitLoginForm = (event) => {
    event.preventDefault();
    axios
      .post("http://3.137.34.100:3001/dealer/login", dealerLogin)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          let token = response.data.dealerToken;
          // console.log(token);
          localStorage.setItem("dealerToken", token);
          localStorage.setItem("dealerName", response.data.userName);
          localStorage.setItem("dealerProfilePic", response.data.profilePic);
          history.push("/dealer/dashboard");
        } else {
          /**
           * TODO: Show the message in the login page
           */
        }
      });
  };
  return (
    <div>
      <div className="loginPage">
        <div className="loginForm">
          <Form onSubmit={submitLoginForm}>
            <Form.Group controlId="formBasicUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                onChange={changeHandler}
                placeholder="Enter User Name"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={changeHandler}
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <div className="login-signup">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <p>
                New user<Link to="/dealer/signup"> Sign Up </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default DealerLogin;
