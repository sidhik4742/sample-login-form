import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "../Signup.css";

function CustomerSignup(props) {
  const history = useHistory();
  // const [userSignUpDetails, setUserSignUpDetails] = useState();
  const { userSignUpDetails, setUserSignUpDetails } = props;

  // useEffect(() => {
  //   return () => {
  //     userSignUpDetails.lastName = "";
  //     console.log("use effect");
  //   };
  // });

  const changeHandler = (event) => {
    setUserSignUpDetails({
      ...userSignUpDetails,
      [event.target.name]: event.target.value,
    });
  };
  const submitSignUpForm = (event) => {
    event.preventDefault();
    console.log(userSignUpDetails);
    if (
      userSignUpDetails.password !== userSignUpDetails.cPassword ||
      !userSignUpDetails.password
    ) {
      userSignUpDetails.firstName = "";
    } else {
      history.push("/signup/ship-address");
    }
  };

  return (
    <div className="signupPage">
      <div className="root">
        <Breadcrumb>
          <Breadcrumb.Item active href="/signup">
            Step1
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/signup/ship-address">Step2</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="signupForm">
        <Form onSubmit={submitSignUpForm}>
          <Row>
            <Col>
              <Form.Group controlId="formBasicFirstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={userSignUpDetails.firstName}
                  onChange={changeHandler}
                  placeholder="First name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicLasttname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={changeHandler}
                  placeholder="Last name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              onChange={changeHandler}
              placeholder="User name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Row>
            <Col>
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
            </Col>
            <Col>
              <Form.Group controlId="formBasicCpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="cPassword"
                  onChange={changeHandler}
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <Link to="/signup/ship-address"> */}
          <Button variant="primary" type="submit">
            Next
          </Button>
          {/* </Link> */}
        </Form>
      </div>
    </div>
  );
}

export default CustomerSignup;
