import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Breadcrumb } from "react-bootstrap";
import axios from "axios";
import "../ShipAddress.css";

function CustomerShipAddress(props) {
  const history = useHistory();
  const { userSignUpDetails, setUserSignUpDetails } = props;
  // console.log(userSignUpDetails);
  const [shipAddress, setShipAddress] = useState();

  const changeHandler = (event) => {
    setShipAddress({ ...shipAddress, [event.target.name]: event.target.value });
    setUserSignUpDetails({ ...userSignUpDetails, shipAddress: shipAddress });
  };
  const submitSignUpForm = (event) => {
    event.preventDefault();
    console.log(userSignUpDetails);
    axios
      .post("http://3.137.34.100:3001/signup", userSignUpDetails)
      .then(function (response) {
        console.log(response.data);
        if (response.data.message === 200) {
          history.push("/login");
        } else {
          /**
           * TODO: do something
           */
        }
      });
    // console.log(userSignUpDetails);
  };
  return (
    <div className="signupPage">
      <div className="root">
        <Breadcrumb>
          <Breadcrumb.Item href="/signup">Step1</Breadcrumb.Item>
          <Breadcrumb.Item active href="/signup/ship-address">
            Step2
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="signupForm">
        <Form onSubmit={submitSignUpForm}>
          <Row>
            <Col>
              <Form.Group controlId="formBasicFullname">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  onChange={changeHandler}
                  placeholder="Full name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  onChange={changeHandler}
                  placeholder="Mobile Number"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              onChange={changeHandler}
              placeholder="Address"
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formBasicLandmark">
                <Form.Label>Landmark</Form.Label>
                <Form.Control
                  type="text"
                  name="landmark"
                  onChange={changeHandler}
                  placeholder="Landmark"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicTown/City">
                <Form.Label>Town/City</Form.Label>
                <Form.Control
                  type="text"
                  name="townOrCity"
                  onChange={changeHandler}
                  placeholder="Town/City"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicPincode">
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="pincode"
                  onChange={changeHandler}
                  placeholder="Pincode"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CustomerShipAddress;
