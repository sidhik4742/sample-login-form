import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Form, Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import '../Login.css';
import otpHandler from '../Customer/subComponent/OtpLogin/OtpLogin';

function CustomerLogin({setCustomerName}) {
  const history = useHistory();
  const [userLogin, setUserLogin] = useState({});
  const [error, setError] = useState({});
  const [blockStatus, setBlockStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [mobNum, setMobNum] = useState(false);
  const [validationErr, setValidationErr] = useState(false);
  const [otpValidationErr, setOtpValidationErr] = useState(false);
  const [otpInput, setOtpInput] = useState(false);
  const [otpDigits, setOtpDigits] = useState();

  const changeHandler = (event) => {
    const {name} = event.target.name;
    const {value} = event.target.value;
    // for username
    // if()
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  };

  const submitLoginForm = (event) => {
    event.preventDefault();
    let userStatus = localStorage.getItem('userStatus');
    if (userStatus === 'Active') {
      setBlockStatus(false);
      axios
        .post('http://3.137.34.100:3001/login', userLogin)
        .then(function (response) {
          console.log(response.data);
          if (response.data.status === 200) {
            localStorage.setItem('customerToken', response.data.customerToken);
            localStorage.setItem('customerName', response.data.customer);
            history.push('/');
          } else {
            /**
             * TODO: Show the message in the login page
             */
          }
        });
    } else {
      setBlockStatus(true);
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const otpVerificationModalShow = () => {
    setShow(true);
  };
  const mobileNumberHandler = (event) => {
    setMobNum({
      ...mobNum,
      [event.target.name]: event.target.value,
    });
  };
  const mobNumberValidation = () => {
    console.log(mobNum.mobileNumber);
    if (mobNum.mobileNumber != '' && mobNum.mobileNumber.length === 10) {
      setValidationErr(false);
      axios
        .post('http://3.137.34.100:3001/numbervalid', mobNum)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            localStorage.setItem('otpId', response.data.result.otp_id);
            setOtpInput(true);
          } else {
            setValidationErr(true);
            // setOtpValidationErr(true);
            // setTimeout(() => {
            //   setShow(false);
            // }, 1000);
          }
        });
    } else {
      // setOtpInput(true);
      setValidationErr(true);
    }
  };
  const otpVerficationHandler = (event) => {
    setOtpDigits({
      ...otpDigits,
      [event.target.name]: event.target.value,
    });
  };

  const otpVerification = () => {
    // setOtpValidationErr(true);
    // setTimeout(() => {
    //   setShow(false);
    // }, 1000);
    let otpVerifyDetails = {
      otpId: localStorage.getItem('otpId'),
      userEnteredOtp: otpDigits,
      mobileNumber: mobNum,
    };
    axios
      .post('http://3.137.34.100:3001/numberverify', otpVerifyDetails)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setShow(false);
          localStorage.setItem(
            'customerToken',
            response.data.result[0].customerToken
          );
          localStorage.setItem(
            'customerName',
            response.data.result[0].userName
          );
          history.push('/');
        } else {
          setValidationErr(true);
          // setOtpValidationErr(true);
          // setTimeout(() => {
          //   setShow(false);
          // }, 1000);
        }
      });
  };
  console.log(otpDigits);
  return (
    <div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>OTP Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicMobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={mobileNumberHandler}
                placeholder="Enter Mobile number without contry code"
                required
              />
            </Form.Group>
            {validationErr && (
              <p style={{color: 'red'}}>* Enter the correct mobile number</p>
            )}
            {otpInput && (
              <Form.Control
                type="number"
                name="otp"
                onChange={otpVerficationHandler}
                placeholder="Enter otp sent to the mobile"
                required
              />
            )}
            {otpValidationErr && (
              <p style={{color: 'red'}}>* Otp is incorrect</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            {otpInput ? (
              <Button onClick={otpVerification} type="submit" variant="primary">
                Verify OTP
              </Button>
            ) : (
              <Button
                onClick={mobNumberValidation}
                type="submit"
                variant="primary"
              >
                Send OTP
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
      <div className="loginPage">
        <div className="loginForm">
          <Form onSubmit={submitLoginForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User name</Form.Label>
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
            {blockStatus && (
              <p style={{color: 'red'}}>
                This account has been blocked by the admin{' '}
              </p>
            )}
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <div className="login-signup">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <p>
                New user<Link to="/signup"> Sign Up </Link>
              </p>
              <div>
                <p
                  onClick={otpVerificationModalShow}
                  style={{color: '#007bff', cursor: 'pointer'}}
                >
                  Sign in with OTP
                </p>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
