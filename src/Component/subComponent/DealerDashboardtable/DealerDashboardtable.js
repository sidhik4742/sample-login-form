import axios from 'axios';
import React, {useEffect, useState} from 'react';
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

import DealerAdd from '../../Login-Signup/Admin/DealerAdd';
import DealerEdit from '../../Login-Signup/Admin/DealerEdit';
import DeleteModal from '../DeleteModal/DeleteModal';
import './DealerDashboardtable.css';

function DealerDashboardtable({
  dealerDatas,
  setDealerDatas,
  adminDashboardContent,
  setAdminChooseContent,
  setUserStatus,
  userStatus,
}) {
  const [dealerId, setDealerId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealerData, setDealerData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    console.log('rendering');
    setUserStatus(false) 
    setDealerData(dealerDatas);
  }, [dealerDatas]);

  const removeDealer = (id) => {
    console.log(id);
    setDealerId(id);
    setShowDeleteModal(true);
  };

  const setDealerShow = () => {};
  const editDealer = (id) => {
    console.log(id);
    setDealerId(id);
    setShowEditModal(true);
  };
  const addDealer = () => {
    console.log('add dealer');
    setShowAddModal(true);
  };

  // console.log(dealerData);

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div>
        <DashboardPanel
          adminDashboardContent={adminDashboardContent}
          setAdminChooseContent={setAdminChooseContent}
        />
      </div>
      <div className="dashboardTable">
        <div className="panelContent">
          <div>
            <h2>Dealer Table</h2>
          </div>
          <div>
            <Button variant="primary" onClick={addDealer}>
              Add dealer
            </Button>
          </div>
        </div>
        <div className="header">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {dealerData.map((data, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td> {data.name} </td>
                  <td> {data.userName} </td>
                  <td> {data.email} </td>
                  <td>
                    <i
                      className="fa fa-edit"
                      aria-hidden="true"
                      onClick={() => editDealer(data._id)}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => removeDealer(data._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showDeleteModal ? (
            <div>
              <DeleteModal
                setShowDeleteModal={setShowDeleteModal}
                showDeleteModal={showDeleteModal}
                dealerId={dealerId}
                dealerData={dealerData}
                setDealerData={setDealerData}
                dealerDatas={dealerDatas}
                setDealerDatas={setDealerDatas}
                userStatus={userStatus}
              />
            </div>
          ) : null}
          {showAddModal ? (
            <div>
              <DealerAdd
                dealerData={dealerData}
                setDealerData={setDealerData}
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
              />
            </div>
          ) : null}
          {showEditModal ? (
            <div>
              <DealerEdit
                setShowEditModal={setShowEditModal}
                showEditModal={showEditModal}
                dealerId={dealerId}
                dealerData={dealerData}
                setDealerData={setDealerData}
                dealerDatas={dealerDatas}
                setDealerDatas={setDealerDatas}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DealerDashboardtable;
