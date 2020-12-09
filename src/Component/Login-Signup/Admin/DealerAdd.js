import axios from "axios";
import React, { useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Container,
  Form,
  Alert,
} from "react-bootstrap";

function DealerAdd({
  dealerData,
  setDealerData,
  showAddModal,
  setShowAddModal,
}) {
  console.log(showAddModal);
  const [addDealerState, setAddDealerState] = useState();
  const handleClose = () => {
    setShowAddModal(false);
  };
  const changeHandler = (event) => {
    setAddDealerState({
      ...addDealerState,
      [event.target.name]: event.target.value,
    });
  };
  const saveDealer = () => {
    console.log(addDealerState);
    axios
      .post("http://3.137.34.100:3001/admin/dashboard", addDealerState)
      .then(function (response) {
        //   console.log(response.data);
        if (response.data.status === 200) {
          // localStorage.removeItem("token");
          let dealerDataCopy = [...dealerData];
          dealerDataCopy.push(addDealerState);
          setDealerData(dealerDataCopy);
        } else {
          /**
           * TODO: Show the message in the login page
           */
        }
      });
    setShowAddModal(false);
  };
  return (
    <div>
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    placeholder="Name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    onChange={changeHandler}
                    placeholder="User Name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formBasicUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                onChange={changeHandler}
                placeholder="email"
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
                    placeholder="password"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCpassword">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="cPassword"
                    onChange={changeHandler}
                    placeholder="Confirm password"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveDealer}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DealerAdd;
