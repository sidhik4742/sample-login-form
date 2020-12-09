import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {MDBDataTable, MDBBtn} from 'mdbreact';
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
import CustomerAdd from './CustomerAdd';
import CustomerEdit from './CustomerEdit';
import CustomerDeleteModal from '../DeleteModal/DeleteModal';
import Header from '../Header/Header';
import DashboardPanel from '../DashboardPanel/DashboardPanel';
function UserDashboardtable({
  adminDashboardContent,
  setAdminDashboardContent,
  setAdminChooseContent,
  setUserStatus,
  userStatus,
}) {
  const [customerList, setCustomerList] = useState([]);
  const [userId, setUserId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealerData, setDealerData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [mdbTable, setMdbTable] = useState([
    {
      // _id: 'Michael Bruce',
      // firstName: 'Javascript Developer',
      // lastName: 'Singapore',
      // userName: '29',
      // email: '2011/06/27',
      // edit: '$183',
      // delete: '',
    },
  ]);
  const [userBlockStatus, setUserBlockStatus] = useState('Active');
  const colorChange = useRef();
  let customerName = localStorage.getItem('customerName');

  useEffect(() => {
    console.log('====================================');
    console.log('mdb table');
    console.log('====================================');
    let rowData = [];
    setUserStatus(true);
    axios
      .get('http://3.137.34.100:3001/admin/dashboard/users-list')
      .then(function (response) {
        console.log(response.data);
        response.data.forEach((element) => {
          // console.log(element._id);
          console.log(element);
          rowData.push({
            _id: element._id,
            firstName: element.firstName,
            lastName: element.lastName,
            userName: element.userName,
            email: element.email,
            edit: (
              <i
                className="fa fa-edit"
                aria-hidden="true"
                onClick={() => editCustomer(data._id)}
              ></i>
            ),
            delete: (
              <i
                className="fa fa-trash-o"
                aria-hidden="true"
                onClick={() => removeCustomer(data._id)}
              ></i>
            ),
          });
        });
        console.log(rowData);
        setCustomerList(rowData);
        setMdbTable(rowData);
      });
  }, []);

  const [data, setdata] = useState({
    columns: [
      {
        label: 'Id',
        field: '_id',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'First Name',
        field: 'firstName',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Last Name',
        field: 'lastName',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'UserName',
        field: 'userName',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Edit',
        field: 'edit',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Delete',
        field: 'delete',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: mdbTable,
  });

  const removeCustomer = (id) => {
    console.log(id);
    setUserId(id);
    setShowDeleteModal(true);
  };
  const setDealerShow = () => {};
  const editCustomer = (id) => {
    console.log(id);
    setUserId(id);
    setShowEditModal(true);
  };
  const addCustomer = () => {
    console.log('add dealer');
    setShowAddModal(true);
  };

  const blockUser = (id, index) => {
    let domElement = document.querySelector(`[data-status = "${index}"]`);
    let blockUserStatus = domElement.getAttribute('data-status');
    let userStatus = domElement.innerHTML;
    if (userBlockStatus === 'Active') {
      domElement.style.color = 'red';
      domElement.innerHTML = 'Blocked';
      userStatus = 'Blocked';
      setUserBlockStatus('Blocked');
    } else if (userBlockStatus === 'Blocked') {
      domElement.style.color = 'white';
      domElement.innerHTML = 'Active';
      userStatus = 'Active';
      setUserBlockStatus('Active');
    }
    console.log(id, blockUserStatus, userBlockStatus, userStatus);
    axios
      .put('http://3.137.34.100:3001/admin/dashboard/users-list/blockuser', {
        params: {
          customerName: customerName,
          customerId: id,
        },
        data: {
          status: userStatus,
        },
      })
      .then((response) => {
        if ((response.data.status = 200)) {
          localStorage.setItem('userStatus', userStatus);
        } else {
          console.log('user exist');
        }
      });
  };

  console.log(mdbTable);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="panelContent">
        <DashboardPanel
          adminDashboardContent={adminDashboardContent}
          setAdminChooseContent={setAdminChooseContent}
        />
        <div className="dashboardTable">
          <div className="header">
            <div>
              <h2>User Table</h2>
            </div>
            <div>
              <Button variant="primary" onClick={addCustomer}>
                Add Customer
              </Button>
            </div>
          </div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody>
              {customerList.map((data, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td> {data.firstName} </td>
                  <td> {data.lastName} </td>
                  <td> {data.userName} </td>
                  <td> {data.email} </td>
                  <td>
                    <i
                      style={{cursor: 'pointer'}}
                      className="fa fa-edit"
                      aria-hidden="true"
                      onClick={() => editCustomer(data._id)}
                    ></i>
                  </td>
                  <td>
                    <i
                      style={{cursor: 'pointer'}}
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => removeCustomer(data._id)}
                    ></i>
                  </td>
                  <td>
                    <p
                      data-status={index}
                      style={{cursor: 'pointer'}}
                      onClick={() => blockUser(data._id, index)}
                    >
                      Active
                      {/* {userBlockStatus} */}
                    </p>
                    {/* <i
                      ref={colorChange}
                      data-status={index}
                      style={{cursor: 'pointer'}}
                      className="fa fa-ban"
                      aria-hidden="true"
                      onClick={() => blockUser(data._id)}
                    >
                      {' '}
                      {userBlockStatus}{' '}
                    </i> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <MDBDataTable striped bordered small data={data} /> */}
          {showDeleteModal ? (
            <div>
              <CustomerDeleteModal
                setShowDeleteModal={setShowDeleteModal}
                showDeleteModal={showDeleteModal}
                userId={userId}
                customerList={customerList}
                setCustomerList={setCustomerList}
                userStatus={userStatus}
              />
            </div>
          ) : null}
          {showAddModal ? (
            <div>
              <CustomerAdd
                dealerData={dealerData}
                setDealerData={setDealerData}
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
              />
            </div>
          ) : null}
          {showEditModal ? (
            <div>
              <CustomerEdit
                setShowEditModal={setShowEditModal}
                showEditModal={showEditModal}
                userId={userId}
                customerList={customerList}
              />
            </div>
          ) : null}
          <div className="addUser"></div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardtable;
