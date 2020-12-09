import React, {useEffect} from 'react';
import {MDBDataTable, MDBBtn} from 'mdbreact';
import {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import './OrderHistory.css';

import Header from '../Header/Header';
import DashboardPanel from '../DashboardPanel/DashboardPanel';

function OrderHistory({
  mainUrl,
  setOrderDetails,
  orderDetails,
  dealerName,
  setDealerName,
  dashboardContent,
  setChooseContent,
  chooseContent,
  dealerLoginCrentials,
  setdealerLoginCrentials,
}) {
  console.log(orderDetails);

  const history = useHistory();
  const [orderStatusVeriable, setrOderStatusVeriable] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('dealerToken');
    let dealerName = localStorage.getItem('dealerName');
    let profilePic = localStorage.getItem('dealerProfilePic');
    setDealerName(localStorage.getItem('dealerName'));
    setdealerLoginCrentials({
      ...dealerLoginCrentials,
      ['profilePic']: profilePic,
    });
    if (token) {
      let rowData = [];
      console.log('====================================');
      console.log('tocken aooroved');
      console.log('====================================');
      let details = [];
      axios
        .get('http://3.137.34.100:3001/dealer/dashboard/orderlist', {
          params: {
            dealerName: dealerName,
          },
        })
        .then(function (response) {
          console.log(response.data.data);
          details = response.data.data;
          // setOrderDetails(response.data.data);
          response.data.data.forEach((element) => {
            // console.log(element._id);
            rowData.push(
              element._id,
              (element._id.action = (
                <select
                  value={orderStatusVeriable}
                  onChange={(event) =>
                    orderStatusAction(element._id.orderId, event)
                  }
                >
                  <option value="">Choose</option>
                  <option value="approve">Approve</option>
                  <option value="cancel">Cancel</option>
                </select>
              ))
            );
          });
          console.log(rowData);
          setOrderDetails(rowData);
        });
    } else {
    }
  }, []);

  const contentSelection = () => {
    if (chooseContent === 3) {
      console.log('orderHistory');
      history.push('/dealer/dashboard/orderhistory');
    }
  };

  const orderStatusAction = (id, event) => {
    let orderStatus = event.target.value;
    console.log(id, orderStatus);
    axios
      .put('http://3.137.34.100:3001/dealer/dashboard/orderlist', {
        data: {orderStatus: orderStatus},
        params: {
          orderId: id,
          orderStatus: orderStatus,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  console.log(dealerLoginCrentials);

  const [data, setdata] = useState({
    columns: [
      {
        label: 'Order Id',
        field: 'orderId',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Book Name',
        field: 'bookName',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Customer name',
        field: 'customerName',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Quantity',
        field: 'quantity',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Price',
        field: 'price',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Total price',
        field: 'totalPrice',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Oder date',
        field: 'orderDate',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Payment type',
        field: 'paymenttype',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: orderDetails,
  });
  console.log('outside');
  return (
    <div className="panel">
      <div className="header">
        <Header dealerName={dealerName} />
      </div>
      <div className="panelContent">
        <DashboardPanel
          dashboardContent={dashboardContent}
          setChooseContent={setChooseContent}
          dealerLoginCrentials={dealerLoginCrentials}
          mainUrl={mainUrl}
        />
        <MDBDataTable striped bordered small data={data} />
      </div>
      {contentSelection()}
    </div>
  );
}

export default OrderHistory;
