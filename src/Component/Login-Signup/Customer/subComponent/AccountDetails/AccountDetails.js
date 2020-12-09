import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./AccountDetails.css";

function AccountDetails() {
  const [customerAccountDetails, setCustomerAccountDetails] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    shipAddress: {
      address: "",
      fullName: "",
      landmark: "",
      mobileNumber: "",
      pincode: "",
      townOrCity: "",
    },
  });

  useEffect(() => {
    let customerName = localStorage.getItem("customerName");
    axios
      .get("http://3.137.34.100:3001/accountInfo", {
        params: {
          customerName: customerName,
        },
      })
      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data.data[0]);
          setCustomerAccountDetails(response.data.data[0]);
          //   customerAccountDetails.push(response.data.data[0]);
        } else {
        }
      });
  }, []);

  const changeHandler = (event) => {
    setCustomerAccountDetails({
      ...customerAccountDetails,
      [event.target.name]: event.target.value,
    });
  };

  const submitSignUpForm = (event) => {
    event.preventDefault();
    // console.log(userSignUpDetails);
    axios
      .put("http://3.137.34.100:3001/accountInfo", customerAccountDetails)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          // localStorage.removeItem("token");
          //   let dealerDataCopy = [...dealerData];
          //   dealerDataCopy.push(addDealerState);
          //   setDealerData(dealerDataCopy);
        } else {
          /**
           * TODO: Show the message in the login page
           */
        }
      });
  };
  console.log(customerAccountDetails);
  return (
    <div className="accountDetails">
      <Form onSubmit={submitSignUpForm}>
        <Row>
          <Col>
            <Form.Group controlId="formBasicFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={customerAccountDetails.firstName}
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
                value={customerAccountDetails.lastName}
                onChange={changeHandler}
                placeholder="Last name"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={customerAccountDetails.userName}
                onChange={changeHandler}
                placeholder="User name"
                required
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={customerAccountDetails.email}
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
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formBasicFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={customerAccountDetails.shipAddress.fullName}
                onChange={changeHandler}
                placeholder="Full name"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={customerAccountDetails.shipAddress.mobileNumber}
                onChange={changeHandler}
                placeholder="Mobile Number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={customerAccountDetails.shipAddress.address}
            onChange={changeHandler}
            placeholder="Address"
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="formBasicLandmark">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                value={customerAccountDetails.shipAddress.landmark}
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
                value={customerAccountDetails.shipAddress.townOrCity}
                onChange={changeHandler}
                placeholder="Town/City"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicPincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={customerAccountDetails.shipAddress.pincode}
                onChange={changeHandler}
                placeholder="Pincode"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Edit
        </Button>
      </Form>
    </div>
  );
}

export default AccountDetails;
