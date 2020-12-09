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

function AddCategory({
  showCategoryModel,
  setShowCategoryModel,
  setFilterData,
  filterData,
}) {
  console.log(filterData);
  const [categoryName, setCategoryName] = useState();
  const [categoryNameErr, setCategoryNameErr] = useState(false);
  const handleClose = () => setShowCategoryModel(false);

  const categoryHandler = (event) => {
    setCategoryName({...categoryName, [event.target.name]: event.target.value});
  };
  const addCategory = () => {
    axios
      .post('http://3.137.34.100:3001/admin/dashboard/addcategory', categoryName)
      .then((response) => {
        if (response.data.status === 200) {
          setCategoryNameErr(false);
          console.log(response.data.data);
          setFilterData([...filterData, response.data.data]);
          setShowCategoryModel(false);
        } else if (response.data.status === 409) {
          setCategoryNameErr(true);
        }
      });
  };

  console.log(categoryName);
  return (
    <div>
      <Modal
        show={showCategoryModel}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Category name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={categoryHandler}
              required
            />
          </Form.Group>
          {categoryNameErr && (
            <p style={{color: 'red'}}> *Category already exist </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={addCategory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddCategory;
