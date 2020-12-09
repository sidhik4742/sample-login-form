import axios from 'axios';
import React, {useState} from 'react';
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

function EditCategory({
  editShowCategoryModel,
  setEditShowCategoryModel,
  setFilterData,
  filterData,
  editCategoryData,
  setEditCategoryData,
}) {
  const [categoryName, setCategoryName] = useState();
  const handleClose = () => setEditShowCategoryModel(false);
  const categoryHandler = (event) => {
    setEditCategoryData({
      ...editCategoryData,
      [event.target.name]: event.target.value,
    });
  };

  const editCategory = () => {
    axios
      .put(
        'http://3.137.34.100:3001/admin/dashboard/editcategory',
        editCategoryData
      )
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setFilterData(response.data.data);
          setEditShowCategoryModel(false);
        } else if (response.data.status === 409) {
        }
      });
    setEditShowCategoryModel(false);
  };
  console.log(editCategoryData);
  return (
    <div>
      <Modal
        show={editShowCategoryModel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Category name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editCategoryData.name}
              onChange={categoryHandler}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editCategory}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditCategory;
