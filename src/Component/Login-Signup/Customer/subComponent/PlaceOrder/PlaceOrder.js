import React, {useRef, useState} from 'react';
import './PlaceOrder.css';
import date from 'date-and-time';
import {useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import PayPal from '../PayPal/PayPal';
// import razorPay from "../RazorPay/RazorPay";
import {Form, Button, Table} from 'react-bootstrap';
const razorPay = require('../RazorPay/RazorPay');

const pattern = date.compile('dddd,DD, MMMM');
const customerName = localStorage.getItem('customerName');

function PlaceOrder({
  shipAddress,
  setShipAddress,
  cartDetailsCpy,
  paymentOption,
  mainUrl,
  totalAmount,
  setTotalAmount,
  setOrderDateAndPaymentMethod,
  orderDateAndPaymentMethod,
  setCartDetailsCpy,
  setCustomerPageStatus,
  setAccountVsOrder,
}) {
  const history = useHistory();
  console.log(cartDetailsCpy);
  console.log(totalAmount);

  const [savingAmount, setSavingAmount] = useState();
  const [paypalTransactionDetsils, setPaypalTransactionDetsils] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [couponData, setCouponData] = useState({
    status: false,
  });
  const [couponDetails, setCouponDetails] = useState();
  const [couponShow, setCouponShow] = useState(false);
  const [couponValidErr, setCouponValidErr] = useState(false);
  const [couponAmount, setCouponAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [errMessages, setErrMessages] = useState(0);

  const couponRef = useRef();

  useEffect(() => {
    let amount = 0;
    let totalAmount = 0;
    cartDetailsCpy.forEach((savingAmount) => {
      amount =
        amount +
        (savingAmount.price * savingAmount.quantity * savingAmount.offer) / 100;
      totalAmount = totalAmount + parseInt(savingAmount.offerPrice);
    });
    setFinalAmount(totalAmount);
    setSavingAmount(amount);
    setTotalAmount(totalAmount);
    return () => {
      if (orderDateAndPaymentMethod.paymentOption === 'payPal') {
        sensToOrderHistory();
      }
    };
  }, []);

  const sensToOrderHistory = (transactionDetails) => {
    axios
      .post('http://3.137.34.100:3001/placeOrder', {
        orderDetails: cartDetailsCpy,
        orderDateAndPaymentMethod: orderDateAndPaymentMethod,
        transactionDetails: transactionDetails,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          axios
            .delete('http://3.137.34.100:3001/viewcartRemoveAll', {
              params: {
                customerName: customerName,
              },
            })
            .then(function (response) {
              console.log(response.data);
              if (response.data.status === 200) {
                setAccountVsOrder(false);
                history.push('/accountInfo');
                axios
                  .put('http://3.137.34.100:3001/usedcouponupdation', {
                    params: {
                      customerName: customerName,
                    },
                    data: {
                      couponData: couponData,
                    },
                  })
                  .then(function (response) {
                    console.log(response.data);
                    if (response.data.status === 200) {
                    } else {
                    }
                  });
              } else {
              }
            });
        } else {
        }
      });
    console.log(couponData);
  };

  const PlaceOrder = () => {
    if (orderDateAndPaymentMethod.paymentOption === 'cod') {
      setOrderDateAndPaymentMethod({
        ...orderDateAndPaymentMethod,
        orderId: Date.now(),
        status: 'pending',
      });
      let transactionDetails = {
        orderId: Date.now(),
        status: 'pending',
      };
      sensToOrderHistory(transactionDetails);
    } else if (orderDateAndPaymentMethod.paymentOption === 'razorPay') {
      let razorPayCredentials = {
        imageSrc: mainUrl + cartDetailsCpy[0].imageUrl,
        amount: finalAmount,
        orderId: orderDateAndPaymentMethod.orderId,
        name: cartDetailsCpy[0].customerName,
      };

      console.log(finalAmount);
      razorPay.displayRazorPay(razorPayCredentials, (transactionDetails) => {
        console.log(transactionDetails);
        if (transactionDetails.status) {
          setOrderDateAndPaymentMethod({
            ...orderDateAndPaymentMethod,
            orderId: transactionDetails.orderId,
            status: 'pending',
          });
          sensToOrderHistory(transactionDetails);
        } else {
        }
      });
    }
    // else if (orderDateAndPaymentMethod.paymentOption === "payPal") {
    //   //AbgHyxTI-BMsBqoxbvfFjiE68iD0xby1DhQVPXgQMC1jultABjgO1XevAqTMGR6_mE-Um2OYyM2Z0jad
    //   console.log("entering to paypal ");
    //   return <PayPal totalAmount={totalAmount} />;
    // }
  };
  const couponHandler = (event) => {
    setCouponData({...couponData, [event.target.name]: event.target.value});
  };
  const couponValidateHandler = () => {
    let couponId = {
      id: '',
    };
    axios
      .get('http://3.137.34.100:3001/checkusedcoupon', {
        params: {
          name: customerName,
        },
      })
      .then((response) => {
        let usedCoupon = response.data.data[0].usedCoupon;
        console.log(usedCoupon);
        let isCouponAvailable;
        usedCoupon.forEach((coupon) => {
          if (coupon == couponData.coupon) {
            isCouponAvailable = true;
          } else {
            isCouponAvailable = false;
          }
        });
        if (!isCouponAvailable) {
          axios
            .get('http://3.137.34.100:3001/iscouponvalid', {
              params: {
                couponCode: couponData,
              },
            })
            .then((response) => {
              try {
                console.log(response.data);
                if (response.data.status === 200) {
                  setCouponValidErr(false);
                  couponId.id = response.data.data[0]._id;
                  setCouponDetails(response.data.data[0]);
                  setCouponAmount(response.data.data[0].couponOfferAmount);
                  // let dateSplit = response.data.data[0].expiredDate.split('T');
                  // let dateValue = dateSplit[0].split('-');
                  // let timeValue = dateSplit[1].split(':');
                  // console.log(dateValue, timeValue);
                  // let expiredDateIsValid = `${dateValue[0]}/${dateValue[1]}/${
                  //   dateValue[2]
                  // }${' '}${timeValue[0]}:${timeValue[1]}`;
                  let expiredDate = response.data.data[0].expiredDate;
                  let isValidExpiredDate = new Date(expiredDate);
                  if (
                    isValidExpiredDate.setHours(0, 0, 0, 0) >=
                    new Date().setHours(0, 0, 0, 0)
                  ) {
                    setCouponAmount(
                      (totalAmount *
                        parseInt(response.data.data[0].couponOfferAmount)) /
                        100
                    );
                    setFinalAmount(
                      totalAmount + deliveryCharge - parseInt(couponAmount)
                    );
                    setCouponData({...couponData, status: true});
                    setCouponShow(true);
                  } else {
                    setErrMessages('*Coupon not valid');
                    setCouponValidErr(true);
                    axios
                      .put('http://3.137.34.100:3001/iscouponvalid', couponId)
                      .then((response) => {
                        if (response.data.status === 200) {
                          console.log(response.data);
                        } else {
                          console.log('Error');
                        }
                      });
                  }
                } else {
                  setCouponValidErr(true);
                }
              } catch (error) {
                console.log('Request send error' + error);
              }
            });
        } else {
          setCouponValidErr(true);
          setErrMessages('*Coupon already used');
        }
      });
  };
  console.log(finalAmount);

  console.log(savingAmount);
  return (
    <div className="placeOrder">
      <div className="head">
        <h2>Review your order</h2>
      </div>
      <div className="headerSection">
        <div className="paymentInfo">
          <div className="address">
            <h6>Shipping Address</h6>
            <p>{shipAddress.fullName}</p>
            <p>{shipAddress.address}</p>
            <p>Pincode : {shipAddress.pincode}</p>
            <p> Landmark : {shipAddress.landmark}</p>
            <p> Phone: {shipAddress.mobileNumber}</p>
          </div>
          <div className="paymentmethod">
            <h6>Pyment Method</h6>
            <p>{paymentOption}</p>
          </div>
          <div className="billingAddress">
            <h6>Billing Address</h6>
            <p>Same as the shipping address</p>
          </div>
        </div>
        <div className="placeOrderBtn">
          <div className="btn">
            {orderDateAndPaymentMethod.paymentOption === 'payPal' ? (
              <PayPal
                finalAmount={finalAmount}
                setOrderDateAndPaymentMethod={setOrderDateAndPaymentMethod}
                orderDateAndPaymentMethod={orderDateAndPaymentMethod}
                cartDetailsCpy={cartDetailsCpy}
                orderDateAndPaymentMethod={orderDateAndPaymentMethod}
                setAccountVsOrder={setAccountVsOrder}
              />
            ) : (
              <button onClick={PlaceOrder}>Place Order and Pay</button>
            )}
          </div>
          <div className="orderSummery">
            <p>
              {' '}
              <strong> Order Summery </strong>{' '}
            </p>
            <p>Items : &#x20B9;{totalAmount}</p>
            <p>Delivery charge : &#x20B9;{deliveryCharge}</p>
            <hr />
            {couponShow && (
              <h6 id="couponOffer">
                Coupon Offer : &#x20B9;
                {parseInt(couponAmount)}
              </h6>
            )}
            <h6 id="orderTotal">
              Order Total : &#x20B9;
              {totalAmount + deliveryCharge - parseInt(couponAmount)}
            </h6>
            <hr />
            <p id="savings">
              {' '}
              Your Savings : &#x20B9;{savingAmount +
                parseInt(couponAmount)}{' '}
            </p>
          </div>
        </div>
        <div className="coupon">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Do you have a coupon?</Form.Label>
            <Form.Control
              type="text"
              name="coupon"
              placeholder="Enter coupon"
              onChange={couponHandler}
            />
            {couponValidErr && (
              <p style={{color: 'red'}} id="errorIndication">
                {errMessages}
              </p>
            )}
          </Form.Group>
          <Button variant="warning" onClick={couponValidateHandler}>
            {' '}
            Check Offer{' '}
          </Button>
        </div>
      </div>
      <div className="productInfo">
        {cartDetailsCpy.map((product, index) => (
          <div key={index} className="oneProduct">
            <div className="header">
              <br />
              <h4> {date.format(date.addDays(new Date(), 5), pattern)} </h4>
            </div>
            <div className="productDetails">
              <div className="image">
                {<img src={mainUrl + product.imageUrl} alt="404" />}
              </div>
              <div className="content">
                <p>
                  <span>{product.bookName}</span>
                  <br />
                  <span id="oldPrice"> &#x20B9; {product.price}</span>
                  <span id="newPrice"> &#x20B9; {product.offerPrice}</span>
                  <br />
                  <span>
                    {' '}
                    You save : &#x20B9;
                    {(product.price * product.quantity * product.offer) / 100}
                  </span>
                  <br />
                  <span> Quantity : {product.quantity}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceOrder;
