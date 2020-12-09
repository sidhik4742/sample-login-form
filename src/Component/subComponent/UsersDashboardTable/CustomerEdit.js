import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Container,
  Form,
  Alert,
} from 'react-bootstrap';

function ProductEdit({setShowEditModal, showEditModal, userId, customerList}) {
  const [showShipAddressModel, setShowShipAddressModel] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [shipAddress, setShipAddress] = useState({});
  const [editedFilterData, setEditedFilterData] = useState([]);
  const [editedChangeHandlerData, setEditedChangeHandlerData] = useState();

  useEffect(() => {
    let filterData = customerList.filter((data) => data._id == userId);
    setEditedFilterData(filterData[0]);
    setEditedChangeHandlerData(filterData[0]);
  }, []);

  const handleClose = () => {
    setShowEditModal(false);
  };
  const changeHandler = (event) => {
    editedChangeHandlerData({
      ...editedChangeHandlerData,
      [event.target.name]: event.target.value,
    });
  };
  const shipAddressHandler = (event) => {
    setShipAddress({...shipAddress, [event.target.name]: event.target.value});
    setCustomerDetails({...customerDetails, shipAddress: shipAddress});
  };
  const editUser = (event) => {
    event.preventDefault();
    console.log(customerDetails);

    axios
      .put('http://3.137.34.100:3001/admin/dashboard/users-list', customerDetails)
      .then(function (response) {
        console.log(response.data);
        if (response.data.message === 200) {
        } else {
          /**
           * TODO: do something
           */
        }
        setShowEditModal(false);
      });
  };
  const showShipAddress = (event) => {
    if (showShipAddressModel) {
      setShowShipAddressModel(false);
    } else {
      setShowShipAddressModel(true);
    }
  };
  console.log(editedChangeHandlerData);
  return (
    <div>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton> Customer personal details</Modal.Header>
        <Modal.Body>
          <Form onSubmit={editUser}>
            <Container>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicFirstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={editedFilterData.firstName}
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
                      value={editedFilterData.lastName}
                      onChange={changeHandler}
                      placeholder="Last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formBasicFirstname">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={editedFilterData.userName}
                  onChange={changeHandler}
                  placeholder="User name"
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formBasicFirstname">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={editedFilterData.email}
                  onChange={changeHandler}
                  placeholder="Email"
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
              <Form.Check
                inline
                label="Add ship address"
                type="checkbox"
                id={`inline-'checkbox-3`}
                checked={showShipAddressModel}
                value={showShipAddressModel}
                onChange={showShipAddress}
              />
              {showShipAddressModel ? (
                <div>
                  <Modal.Header>
                    <Modal.Title>Ship Address</Modal.Title>
                  </Modal.Header>
                  <Row>
                    <Col>
                      <Form.Group controlId="formBasicFullname">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={editedFilterData.shipAddress.fullName}
                          onChange={shipAddressHandler}
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
                          value={editedFilterData.shipAddress.mobileNumber}
                          onChange={shipAddressHandler}
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
                      value={editedFilterData.shipAddress.address}
                      onChange={shipAddressHandler}
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
                          value={editedFilterData.shipAddress.landmark}
                          onChange={shipAddressHandler}
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
                          value={editedFilterData.shipAddress.townOrCity}
                          onChange={shipAddressHandler}
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
                          value={editedFilterData.shipAddress.pincode}
                          onChange={shipAddressHandler}
                          placeholder="Pincode"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </Container>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Edit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductEdit;
