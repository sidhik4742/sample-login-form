import axios from 'axios';
import React from 'react';
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

function DeleteCategory({
  deleteCategoryModel,
  setDeleteCategoryModel,
  setFilterData,
  filterData,
  deleteCategoryId,
}) {
  const confirmDelete = () => {
    axios
      .delete('http://3.137.34.100:3001/admin/dashboard/deletecategory', {
        params: {
          id: deleteCategoryId,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          let copyFilterData = filterData.filter(
            (data) => data._id != deleteCategoryId
          );
          setFilterData(copyFilterData);
        }
      });

    setDeleteCategoryModel(false);
  };
  const handleClose = () => setDeleteCategoryModel(false);

  return (
    <div>
      <Modal show={deleteCategoryModel} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you want to delete the Category</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteCategory;
