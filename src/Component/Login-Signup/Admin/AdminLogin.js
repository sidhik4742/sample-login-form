import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../Login.css";

function Login() {
  const history = useHistory();
  const [adminLogin, setAdminLogin] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      history.push("/admin/dashboard");
    } else {
      history.push("/admin");
    }
  });

  const changeHandler = (event) => {
    setAdminLogin({
      ...adminLogin,
      [event.target.name]: event.target.value,
    });
  };

  const submitLoginForm = (event) => {
    event.preventDefault();
    axios
      .post("http://3.137.34.100:3001/admin/login", adminLogin)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          let token = response.data.token;
          localStorage.setItem("token", token);
          history.push("/admin/dashboard/");
        } else {
          /**
           * TODO: Show the message in the login page
           */
        }
      });
  };
  return (
    <div className="loginPage">
      <div className="loginForm">
        <Form onSubmit={submitLoginForm}>
          <Form.Group controlId="formBasicUsername">
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
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
