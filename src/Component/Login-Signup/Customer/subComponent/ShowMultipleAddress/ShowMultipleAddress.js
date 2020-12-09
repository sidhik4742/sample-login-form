import axios from 'axios';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
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

function ShowMultipleAddress({
  showMultipleShipAddressModel,
  setShowMultipleShipAddressModel,
  shipAddress,
  setShipAddress,
}) {
  const buttonRef = useRef();
  const [multipleAddress, setMultipleAddress] = useState([]);
  //   let multipleAddress = [];
  let customerName = localStorage.getItem('customerName');
  useEffect(() => {
    axios
      .get('http://3.137.34.100:3001/getallshipaddress', {
        params: {
          customerName: customerName,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setMultipleAddress(response.data.data);
        } else {
        }
      });
  }, []);
  //   const [show, setShow] = useState(false);
  console.log(multipleAddress);

  const handleClose = () => setShowMultipleShipAddressModel(false);
  //   const handleShow = () => setShow(true);
  const addToDefaultAddress = (id, index) => {
    console.log(id);
    let defaultAddress = multipleAddress[index];
    axios
      .put('http://3.137.34.100:3001/updatedefaultaddress', defaultAddress, {
        params: {
          customerName: customerName,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          console.log(response.data.data);
        } else {
        }
      });
    // let defaultAddress = multipleAddress.filter(
    //   (address) => (address._id = id)
    // );
    // console.log(defaultAddress);
  };
  const selectAddress = (id, index, event) => {
    console.log(id);
    console.log(index);
    console.log(buttonRef[index]);
    // let selectAddress = multipleAddress.filter((address) => (address._id = id));
    setShipAddress(multipleAddress[index]);
    console.log(shipAddress);
  };
  return (
    <div>
      <Modal show={showMultipleShipAddressModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {multipleAddress.map((address, index) => (
            <div className="address">
              <div className="content">
                <span style={{display: 'flex'}}>
                  <Form.Check
                    onClick={() => selectAddress(address._id, index)}
                    type="radio"
                    id={`default-radio`}
                    name="shipAddress"
                  />
                  <div>
                    <p>{address.fullName}</p>
                    <p>{address.address}</p>
                    <p>
                      Pincode : {address.pincode},Mobile :{' '}
                      {address.mobileNumber}
                    </p>
                    <p>Near by : {address.landmark}</p>
                  </div>
                </span>
              </div>
              <div className="action">
                <Button
                  ref={buttonRef[index]}
                  variant="success"
                  value={index}
                  onClick={() => addToDefaultAddress(address._id, index)}
                >
                  Set as a Permanent
                </Button>
              </div>
              <br />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowMultipleAddress;
