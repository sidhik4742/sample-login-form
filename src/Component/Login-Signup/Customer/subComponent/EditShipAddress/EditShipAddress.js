import axios from "axios";
import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

function EditShipAddress({
  ShowShipAddressModel,
  setshowShipAddressModel,
  shipAddress,
  setShipAddress,
}) {
  console.log("edit function");

  const handleClose = () => {
    setshowShipAddressModel(false);
  };
  const changeHandler = (event) => {
    setShipAddress({ ...shipAddress, [event.target.name]: event.target.value });
  };
  const submitSignUpForm = (event) => {
    event.preventDefault();
    setshowShipAddressModel(false);
    let customerName = localStorage.getItem("customerName");
    console.log(shipAddress);
    axios
      .post("http://3.137.34.100:3001/editShipAddress", shipAddress, {
        params: {
          customerName: customerName,
        },
      })
      .then(function (response) {
        if (response.data.message === 200) {
          console.log(response.data);
        } else {
          /**
           * TODO: do something
           */
        }
      });
  };
  return (
    <div className="editShipAddress">
      <Modal
        show={ShowShipAddressModel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ship Address</Modal.Title>
        </Modal.Header>
        <div className="signupForm" style={{ padding: "0.5rem" }}>
          <Form onSubmit={submitSignUpForm}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicFullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={shipAddress.fullName}
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
                    value={shipAddress.mobileNumber}
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
                value={shipAddress.address}
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
                    value={shipAddress.landmark}
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
                    value={shipAddress.townOrCity}
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
                    value={shipAddress.pincode}
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
      </Modal>
    </div>
  );
}

export default EditShipAddress;
