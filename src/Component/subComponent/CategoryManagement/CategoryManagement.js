import React, {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
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
import DeleteCategory from './DeleteCategory';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

function CategoryManagement({
  adminDashboardContent,
  setAdminDashboardContent,
  setAdminChooseContent,
  setUserStatus,
  userStatus,
}) {
  const [filterData, setFilterData] = useState([
    {
      index: 1,
      name: 'sdfsd',
      edit: '',
      delete: '',
    },
  ]);
  const [showCategoryModel, setShowCategoryModel] = useState(false);
  const [editShowCategoryModel, setEditShowCategoryModel] = useState(false);
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState();
  const [editCategoryData, setEditCategoryData] = useState();

  useEffect(() => {
    axios
      .get('http://3.137.34.100:3001/admin/dashboard/category')
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setFilterData(response.data.data);
        } else {
        }
      });
  }, []);

  const editCategory = (id) => {
    let copyFilterData = filterData.filter((data) => data._id == id);
    setEditCategoryData(copyFilterData[0]);

    setEditShowCategoryModel(true);
  };
  const removeCategory = (id) => {
    console.log(id);
    setDeleteCategoryId(id);
    setDeleteCategoryModel(true);
  };
  const addCategory = () => {
    setShowCategoryModel(true);
  };
  console.log(editCategoryData);
  return (
    <div>
      <div className="panel">
        <div className="header">
          <Header />
        </div>
        <div className="panelContent" style={{display: 'flex'}}>
          <DashboardPanel
            adminDashboardContent={adminDashboardContent}
            setAdminChooseContent={setAdminChooseContent}
          />
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{textAlign: 'center'}}>Category</h2>
              <Button variant="primary" onClick={addCategory}>
                Add Category
              </Button>
            </div>
            <Table
              style={{fontSize: 'small', margin: '20px'}}
              striped
              bordered
              hover
              variant="dark"
            >
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((data, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td> {data.name} </td>
                    <td>
                      {' '}
                      <i
                        className="fa fa-edit"
                        aria-hidden="true"
                        onClick={() => editCategory(data._id)}
                      ></i>{' '}
                    </td>
                    <td>
                      <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                        onClick={() => removeCategory(data._id)}
                      ></i>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        {showCategoryModel && (
          <AddCategory
            showCategoryModel={showCategoryModel}
            setShowCategoryModel={setShowCategoryModel}
            setFilterData={setFilterData}
            filterData={filterData}
          />
        )}
        {editShowCategoryModel && (
          <EditCategory
            editShowCategoryModel={editShowCategoryModel}
            setEditShowCategoryModel={setEditShowCategoryModel}
            setFilterData={setFilterData}
            filterData={filterData}
            editCategoryData={editCategoryData}
            setEditCategoryData={setEditCategoryData}
          />
        )}
        {deleteCategoryModel && (
          <DeleteCategory
            deleteCategoryModel={deleteCategoryModel}
            setDeleteCategoryModel={setDeleteCategoryModel}
            setFilterData={setFilterData}
            filterData={filterData}
            deleteCategoryId={deleteCategoryId}
          />
        )}
      </div>
    </div>
  );
}

export default CategoryManagement;
