import axios from 'axios';
import React, {useEffect, useState} from 'react';
import date from 'date-and-time';
import './Chekout.css';
import {Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import EditShipAddress from '../EditShipAddress/EditShipAddress';
import AddShipAddress from '../AddShipAddress/AddShipAddress';
import ShowMultipleAddress from '../ShowMultipleAddress/ShowMultipleAddress';

const pattern = date.compile('dddd,DD, MMMM');

function Chekout({
  cartDetailsCpy,
  setCartDetailsCpy,
  shipAddress,
  setShipAddress,
  setOrderDateAndPaymentMethod,
  orderDateAndPaymentMethod,
}) {
  const [ShowShipAddressModel, setshowShipAddressModel] = useState(false);
  const [addShowShipAddressModel, setAddshowShipAddressModel] = useState(false);
  const [
    showMultipleShipAddressModel,
    setShowMultipleShipAddressModel,
  ] = useState(false);

  useEffect(() => {
    let customerName = localStorage.getItem('customerName');
    setOrderDateAndPaymentMethod({
      ...orderDateAndPaymentMethod,
      orderDate: date.format(new Date(), pattern),
    });
    axios
      .get('http://3.137.34.100:3001/checkout', {
        params: {
          customerName: cartDetailsCpy.customerName,
        },
      })
      .then(function (responce) {
        console.log(responce.data.result);
        setShipAddress(responce.data.result);
      });
  }, []);

  const addMultipleShipAddress = () => {
    console.log("multiple address");
    setAddshowShipAddressModel(true);
  };

  const editShipAddress = () => {
    console.log('edit ship address');
    setshowShipAddressModel(true);
  };
  const showMultipleAddress = () => {
    setShowMultipleShipAddressModel(true);
  };
  console.log(orderDateAndPaymentMethod);
  return (
    <div className="checkout">
      {ShowShipAddressModel ? (
        <EditShipAddress
          ShowShipAddressModel={ShowShipAddressModel}
          setshowShipAddressModel={setshowShipAddressModel}
          shipAddress={shipAddress}
          setShipAddress={setShipAddress}
        />
      ) : null}
      {addShowShipAddressModel && (
        <AddShipAddress
          addShowShipAddressModel={addShowShipAddressModel}
          setAddshowShipAddressModel={setAddshowShipAddressModel}
          shipAddress={shipAddress}
          setShipAddress={setShipAddress}
        />
      )}
      {showMultipleShipAddressModel && (
        <ShowMultipleAddress
          showMultipleShipAddressModel={showMultipleShipAddressModel}
          setShowMultipleShipAddressModel={setShowMultipleShipAddressModel}
          shipAddress={shipAddress}
          setShipAddress={setShipAddress}
        />
      )}
      <div className="parent">
        <div className="header">
          <div className="delveryOption">
            <h1 className="a-spacing-base" data-testid="">
              Choose your delivery options
            </h1>
          </div>
          <div className="submitBtn">
            <Link to="/payMethod">
              <button>Continue</button>
            </Link>
          </div>
        </div>
        <div className="productDetails">
          <div className="shipment-n-of-n ">
            <h3 className="a-spacing-mini" data-testid="">
              Shipment ({cartDetailsCpy.length} items)
            </h3>
            <div className="shipAddress" data-testid="">
              <p>
                Deliver to:&nbsp;
                {`${shipAddress.fullName},${shipAddress.address},${shipAddress.pincode},${shipAddress.landmark}`}
                <span>
                  <i onClick={editShipAddress} className="fa fa-edit"></i>
                  <br />
                  <a
                    onClick={addMultipleShipAddress}
                    style={{
                      color: 'blue',
                      cursor: 'pointer',
                      paddingRight: '10px',
                    }}
                  >
                    {'     '}
                    Add New{' '}
                  </a>
                  <a
                    onClick={showMultipleAddress}
                    style={{color: 'blue', cursor: 'pointer'}}
                  >
                    {' '}
                    Choose Address{' '}
                  </a>
                </span>
              </p>
            </div>
            {cartDetailsCpy.map((product, index) => (
              <ul key={index} className="order-level-item-summary-list">
                <li className="a-spacing-base">
                  <div data-testid="">
                    <strong data-testid="">
                      {product.bookName} written by {product.authorName}
                    </strong>

                    <div className="oldPrice">
                      <p id="old">&#x20B9;{product.price}</p>
                      <p id="new">
                        &#x20B9;{product.offerPrice}
                        <span className="a-color-secondary" data-testid="">
                          {' '}
                          - Quantity: {product.quantity}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="a-size-small" data-testid="">
                        Sold by: {product.dealerName}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
          </div>
          <div className="deliveryDetails">
            <div className="ship-speed">
              <h3 className="a-spacing-mini">Choose a delivery speed</h3>
            </div>
            <div className="chooseDelivery">
              <p>
                <span>
                  {' '}
                  <Form.Check type="radio" id="deliverySpeed" defaultChecked />
                  {date.format(date.addDays(new Date(), 5), pattern)}{' '}
                </span>
                FREE Delivery with Prime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chekout;
