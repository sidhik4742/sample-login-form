import React, {useEffect, useRef} from 'react';
import {MDBDataTable, MDBBtn} from 'mdbreact';
import {useState} from 'react';
import axios from 'axios';
import date from 'date-and-time';
import Pdf from 'react-to-pdf';
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

import Header from '../Header/Header';
import DashboardPanel from '../DashboardPanel/DashboardPanel';
import './Report.css';
import {useHistory} from 'react-router-dom';

function Report({
  adminDashboardContent,
  setAdminChooseContent,
  setUserStatus,
  userStatus,
  orderDetails,
  setOrderDetails,
  setFilterData,
  filterData,
}) {
  const history = useHistory();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const pdfRef = useRef();
  // const 1[filterData, setFilterData] = useState();
  useEffect(() => {
    let rowData = [];
    console.log('====================================');
    console.log('tocken aooroved');
    console.log('====================================');
    let details = [];
    axios
      .get('http://3.137.34.100:3001/admin/dashboard/orderlist', {})
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          details = response.data.data;
          //   setOrderDetails(response.data.data);
          response.data.data.forEach((element) => {
            // console.log(element._id);
            rowData.push(element._id);
          });
          console.log(rowData);
          setFilterData(rowData);
          setOrderDetails(rowData);
        }
      });
  }, [!filterData]);

  const startDatepickerHandler = (event) => {
    console.log(event.target.value);
    let date = event.target.value;
    let day = date.split('-');
    console.log(day[2]);
    setStartDate(parseInt(day[2]));

    // let copyData = [...orderDetails];
    // console.log('====================================');
    // console.log(orderDetails);
    // console.log('====================================');
    // copyData.forEach((element) => {
    //   let orderDay = element.orderDate.split(',');
    //   // let orderDay =  orderDate[2];
    //   console.log(orderDay[1], day[2]);
    //   if (orderDay[1] == day[2]) {
    //     filterData.push(element);
    //   }
    // });

    // let filterData = copyData.filter(
    //   (data) => data.orderDate.split(',')[2] == day[2]
    // );
    // setFilterData(filteredData);
    // console.log(filteredData);
  };
  const endDatepickerHandler = (event) => {
    console.log(event.target.value);
    let date = event.target.value;
    let day = date.split('-');
    console.log(day[2]);
    setEndDate(parseInt(day[2]));
  };

  const filterHandler = (event) => {
    let filteredData = [];
    let copyData = [...orderDetails];
    console.log('====================================');
    console.log(orderDetails);
    console.log('====================================');
    copyData.forEach((element) => {
      let orderDay = element.orderDate.split(',');
      console.log(startDate, endDate);
      if (
        parseInt(orderDay[1]) >= startDate &&
        parseInt(orderDay[1]) <= endDate
      ) {
        //   console.log('====================================');
        //   console.log(element);
        //   console.log('====================================');
        filteredData.push(element);
      }
    });
    console.log(filteredData);
    setFilterData(filteredData);
  };

  const dayReportHandler = (event) => {
    let index = event.target.selectedIndex;
    let value = event.target.childNodes[index].value;
    console.log(value);
    let now = new Date();
    if (value == 'week') {
      let weekSplit = date.addDays(now, -7);
      let week = weekSplit.toString().split(' ');
      console.log(week[2]);
      filterDataBasedDays(week[2]);
    } else if (value == 'month') {
      let monthSplit = date.addDays(now, -30);
      let month = monthSplit.toString().split(' ');
      console.log(month[2]);
      filterDataBasedDays(month[2]);
    } else if (value == 'year') {
      let monthSplit = date.addDays(now, -365);
      let month = monthSplit.toString().split(' ');
      console.log(month[2]);
      filterDataBasedDays(month[2]);
    }
  };
  const categoryReportHandler = (event) => {
    let filteredData = [];
    let index = event.target.selectedIndex;
    let value = event.target.childNodes[index].value;
    console.log(value);
    let copyData = [...orderDetails];
    if (value == 'success') {
      filteredData = copyData.filter((data) => data.status == value);
      setFilterData(filteredData);
    } else if (value == 'Dispatched') {
      console.log('dispatched');
      filteredData = copyData.filter((data) => data.status == value);
      setFilterData(filteredData);
    } else if (value == 'Cancelled') {
      filteredData = copyData.filter((data) => data.status == value);
      setFilterData(filteredData);
    }
  };

  const filterDataBasedDays = (days) => {
    let filteredData = [];
    let splitDateNow = Date().split(' ');
    console.log(splitDateNow[2]);

    let copyData = [...orderDetails];
    console.log(days, splitDateNow[2]);
    copyData.forEach((element) => {
      let orderDay = element.orderDate.split(',');
      // console.log(orderDay[1]);
      if (
        parseInt(orderDay[1]) >= parseInt(days) &&
        parseInt(orderDay[1]) <= parseInt(splitDateNow[2])
      ) {
        console.log('====================================');
        console.log(element);
        console.log('====================================');
        filteredData.push(element);
      }
    });
    console.log(filteredData);
    setFilterData(filteredData);
  };

  //   console.log(startDate, endDate, filterData);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div style={{display: 'flex'}}>
        <DashboardPanel
          adminDashboardContent={adminDashboardContent}
          setAdminChooseContent={setAdminChooseContent}
        />

        <div className="report">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2>Reports</h2>
            <Pdf targetRef={pdfRef} filename="Report.pdf">
              {({toPdf}) => (
                <Button variant="primary" onClick={toPdf}>
                  Download as pdf
                </Button>
              )}
            </Pdf>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
            }}
          >
            <div
              className="filterWithDate"
              style={{display: 'flex', marginBottom: '10px'}}
            >
              <input
                onChange={startDatepickerHandler}
                style={{marginRight: '20px'}}
                type="date"
                name=""
                id=""
              />
              <p style={{marginRight: '15px'}}>To</p>
              <input
                onChange={endDatepickerHandler}
                style={{marginRight: '20px'}}
                type="date"
                name=""
                id=""
              />

              <Button variant="info" onClick={filterHandler}>
                Check
              </Button>
              {/* <button onClick={filterHandler} type="submit">
                {' '}
                Check{' '}
              </button> */}
            </div>
            <div>
              <p>Filtering by date</p>
              <select onChange={dayReportHandler} name="report" id="dayReport">
                <option value="choose"> Choose </option>
                <option value="week"> Last week </option>
                <option value="month"> Last month </option>
                <option value="year"> Last year </option>
              </select>
            </div>
            <div>
              <div>
                <p>Filtering by status</p>
                <select
                  onChange={categoryReportHandler}
                  name="report"
                  id="categoryReport"
                >
                  <option value="choose"> Choose </option>
                  <option value="success"> Success </option>
                  <option value="Dispatched"> Dispatched </option>
                  <option value="Cancelled"> Cancelled </option>
                </select>
              </div>
            </div>
          </div>
          <Table
            style={{
              fontSize: 'small',
              width: 700,
              height: 'auto',
            }}
            ref={pdfRef}
            striped
            bordered
            hover
            variant="dark"
          >
            <thead>
              <tr>
                <th>Order Id</th>
                <th>BookName</th>
                <th>Customer name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total price</th>
                <th>Order date</th>
                <th>Payment type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((data, index) => (
                <tr key={index}>
                  <td>{data.orderId}</td>
                  <td> {data.bookName} </td>
                  <td> {data.customerName} </td>
                  <td> {data.quantity} </td>
                  <td> {data.price} </td>
                  <td> {data.totalPrice} </td>
                  <td> {data.orderDate} </td>
                  <td> {data.paymenttype} </td>
                  <td> {data.status} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Report;
