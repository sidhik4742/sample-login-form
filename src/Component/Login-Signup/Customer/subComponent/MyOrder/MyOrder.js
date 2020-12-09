import axios from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import './MyOrder.css';

function MyOrder({mainUrl}) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    let myOrderItems = [];
    let customerName = localStorage.getItem('customerName');
    axios
      .get('http://3.137.34.100:3001/myOrder', {
        params: {
          customerName: customerName,
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.status === 200) {
          response.data.data.forEach((element) => {
            myOrderItems.push(element);
          });
          setOrderList(myOrderItems);
        } else {
        }
      });
    return () => {
      setOrderList(myOrderItems);
    };
  }, []);

  console.log(orderList);
  // const DatatablePage = () => {
  //   const data = {

  // };

  return (
    <div>
      <h1>My Orders </h1>
      {orderList.map((orderItem, index) => (
        <div key={index} className="parentContent">
          <div className="superHeader">
            <div className="header">
              <div className="orderPlacedDate">
                <div className="left">
                  <div className="orderDate" style={{marginRight: '20px'}}>
                    <p>
                      <strong> Order Date </strong>
                    </p>
                    <p> {orderItem._id.orderDate}</p>
                  </div>
                  <div className="total" style={{marginRight: '20px'}}>
                    <p>
                      <strong> Total Price </strong>
                    </p>
                    <p>&#x20B9;{orderItem._id.totalPrice}</p>
                  </div>
                  <div className="shipTo">
                    {' '}
                    <p>
                      {' '}
                      <strong> Ship TO </strong>
                    </p>{' '}
                    <p> {orderItem._id.customerName} </p>
                  </div>
                </div>
                <div className="orderIdDiv">
                  <div className="orderId">
                    <p>
                      {' '}
                      <strong> Order Id</strong>
                    </p>{' '}
                    {orderItem._id.orderId}{' '}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body">
            <div className="deliverStatus">
              <div className="notes">{orderItem._id.status}</div>
            </div>
            <div className="bodyContent">
              <div className="image">
                <img src={mainUrl + orderItem._id.image} alt="" />
              </div>
              <div className="details">
                <p className="bookName">
                  {' '}
                  <strong> {orderItem._id.bookName} </strong>{' '}
                </p>
                <p> Sold by : {orderItem._id.soldBy}</p>
                <div className="price">
                  <h4 className="rate">&#x20B9; {orderItem._id.price} </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrder;
