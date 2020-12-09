import React, { useState } from "react";
import { useRef } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PaymentMethod.css";

function PaymentMethod({
  paymentOption,
  setPaymentOptions,
  setCartDetailsCpy,
  setOrderDateAndPaymentMethod,
  orderDateAndPaymentMethod,
}) {
  const [cardPaymentModelShow, setCardPaymentModelShow] = useState(false);

  const buttonRef = useRef();

  const paymentOptions = (event) => {
    // console.log(event.target.value);
    let { value } = event.target;
    buttonRef.current.style.display = "block";
    setOrderDateAndPaymentMethod({
      ...orderDateAndPaymentMethod,
      paymentOption: value,
    });
    setPaymentOptions(value);
    if (value === "card") {
      setCardPaymentModelShow(true);
    } else if (value === "cod") {
      setCardPaymentModelShow(false);
    } else if (value === "payPal") {
      setCardPaymentModelShow(false);
    }
  };
  console.log(orderDateAndPaymentMethod);
  return (
    <div className="paymentMethod">
      <div className="header">
        <h1 className="a-spacing-base" data-testid="">
          Select a payment method
        </h1>
      </div>
      <div className="info">
        <strong>
          Pay faster for all your shopping needs <br />
          <span>
            Get Instant refund on cancellations | Zero payment failures
          </span>
        </strong>
      </div>
      <div className="savedCard">
        <p> Your saved credit and debit cards</p>
        <div className="savedCardSection">
          <div className="cardTable">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Your saved credit and debit cards</th>
                  <th>Name on card</th>
                  <th>Expires on</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
          <div className="submitBtn" ref={buttonRef}>
            <Link to="/placeOrder">
              <button>Continue</button>
            </Link>
          </div>
        </div>
        <div className="anotherPayment">
          <div className="head">
            <span className=""> Another payment method</span>
          </div>
          <div className="cardPaymentOption">
            {/* <div className="">
            <span className=""></span>
          </div> */}
            <Form.Check
              inline
              label="1"
              name="paymentOption"
              type="radio"
              id={`inline-radio-1`}
              value="card"
              // checked={paymentOption === "card"}
              onChange={paymentOptions}
            />
            Add Debit/Credit/ATM Card
            {cardPaymentModelShow && (
              <div className="note">
                <span>
                  We’ll save this card for your convenience. Remove it by going
                  to Your Account section.
                </span>
                <Form>
                  <Row>
                    <Col>
                      <Form.Control placeholder="Name on card" />
                    </Col>
                    <Col>
                      <Form.Control placeholder="Card number" />
                    </Col>
                    <Col>
                      <Form.Control type="month" placeholder="month" />
                    </Col>
                    <Col>
                      <Button variant="dark">Add Card</Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
          </div>
        </div>
        <div className="payPal">
          <Form.Check
            inline
            label="2"
            name="paymentOption"
            type="radio"
            id={`inline-radio-1`}
            value="payPal"
            // checked={paymentOption === "cod"}
            onChange={paymentOptions}
          />
          Paypal
          <div className="COD"></div>
        </div>
        <div className="razorPay">
          <Form.Check
            inline
            label="3"
            name="paymentOption"
            type="radio"
            id={`inline-radio-1`}
            value="razorPay"
            // checked={paymentOption === "cod"}
            onChange={paymentOptions}
          />
          Razorpay
          <div className="COD"></div>
        </div>
        <div className="codOption">
          <Form.Check
            inline
            label="4"
            name="paymentOption"
            type="radio"
            id={`inline-radio-1`}
            value="cod"
            // checked={paymentOption === "cod"}
            onChange={paymentOptions}
          />
          Pay on Delivery
          <div className="COD"></div>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
