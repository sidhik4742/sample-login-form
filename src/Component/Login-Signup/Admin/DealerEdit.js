import axios from "axios";
import React, { useEffect, useState } from "react";
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

function DealerEdit({
  setShowEditModal,
  showEditModal,
  dealerId,
  dealerData,
  setDealerData,
  dealerDatas,
  setDealerDatas,
}) {
  const [editDealerState, setEditDealerState] = useState({
    _id: "",
    name: "",
    email: "",
    userName: "",
  });

  useEffect(() => {
    console.log(dealerDatas);
    let filterData = dealerDatas.filter((data) => data._id == dealerId);
    setEditDealerState(filterData[0]);
    // editDealerState.(filterData);
    // console.log(filterData);
    // console.log(editDealerState);
  }, []);

  const changeHandler = (event) => {
    setEditDealerState({
      ...editDealerState,
      [event.target.name]: event.target.value,
    });
  };
  const handleClose = () => {
    setShowEditModal(false);
  };
  const saveDealer = () => {
    console.log(editDealerState);
    axios
      .put("http://3.137.34.100:3001/admin/dashboard", editDealerState)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          // localStorage.removeItem("token");
          //   let dealerDataCopy = [...dealerData];
          //   dealerDataCopy.push(addDealerState);
          //   setDealerData(dealerDataCopy);
          setDealerDatas(response.data.data);
        } else {
          /**
           * TODO: Show the message in the login page
           */
        }
      });
    setShowEditModal(false);
  };
  console.log(editDealerState);

  return (
    <div>
      <Modal show={showEditModal} onHide={handleClose}>
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
                    value={editDealerState.name}
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
                    value={editDealerState.userName}
                    onChange={changeHandler}
                    placeholder="User Name"
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formBasicUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={editDealerState.email}
                onChange={changeHandler}
                placeholder="email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveDealer}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DealerEdit;
