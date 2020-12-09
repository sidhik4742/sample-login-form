import axios from 'axios';
import React, {useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

function AddShipAddress({
  addShowShipAddressModel,
  setAddshowShipAddressModel,
  shipAddress,
  setShipAddress,
}) {
  const [addShipAddress, setAddShipAddress] = useState();
  const [defaultAddressStatus, setDefaultAddressStatus] = useState(true);
  const handleClose = () => {
    setAddshowShipAddressModel(false);
  };
  const changeHandler = (event) => {
    setAddShipAddress({
      ...addShipAddress,
      [event.target.name]: event.target.value,
    });
  };
  const submitSignUpForm = (event) => {
    event.preventDefault();
    let customerName = localStorage.getItem('customerName');
    // console.log(shipAddress);
    axios
      .post('http://3.137.34.100:3001/addShipAddress', addShipAddress, {
        params: {
          customerName: customerName,
        },
      })
      .then(function (response) {
        if (response.data.status === 200) {
          console.log(response.data);
        } else {
          /**
           * TODO: do something
           */
        }
      });
    setAddshowShipAddressModel(false);
  };

  const checkedStatus = (event) => {
    console.log(defaultAddressStatus);
    if (defaultAddressStatus) {
      setDefaultAddressStatus(false);
    } else {
      setDefaultAddressStatus(true);
    }
  };

  console.log(addShipAddress);
  return (
    <div className="editShipAddress">
      <Modal
        show={addShowShipAddressModel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ship Address</Modal.Title>
        </Modal.Header>
        <div className="signupForm" style={{padding: '0.5rem'}}>
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
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicMobile">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobileNumber"
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
                    onChange={changeHandler}
                    placeholder="Landmark"
                    required
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
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="number"
                    name="pincode"
                    onChange={changeHandler}
                    placeholder="Pincode"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                value={defaultAddressStatus}
                // checked={defaultAddressStatus}
                onChange={checkedStatus}
                label="Set Default Address"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default AddShipAddress;
