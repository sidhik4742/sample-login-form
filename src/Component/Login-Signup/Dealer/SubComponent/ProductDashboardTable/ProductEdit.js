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

function ProductEdit({
  productList,
  setProductList,
  showEditModal,
  setShowEditModal,
  productId,
  categoryNames,
  setCategoryNames,
}) {
  const [editProductState, setEditProductState] = useState({});
  const [bookInfo, setBookInfo] = useState({});
  const [bookImg, setBookImg] = useState();

  useEffect(() => {
    console.log(productList);
    let filterData = productList.filter((data) => data._id == productId);
    setEditProductState(filterData[0]);

    // editDealerState.(filterData);
    // console.log(filterData);
    // console.log(editDealerState);
  }, []);

  const handleClose = () => {
    setShowEditModal(false);
  };
  const changeHandler = (event) => {
    setEditProductState({
      ...editProductState,
      [event.target.name]: event.target.value,
    });
  };
  const uploadImg = (event) => {
    let type = event.target.files[0].type;
    if (type == 'image/jpeg' || type == 'image/jpg' || type == 'image/png') {
      console.log(event.target.files);
      setBookImg(event.target.files[0]);
      //   let imgUrl = URL.createObjectURL(event.target.files[0]);
    }
  };
  const saveProduct = () => {
    console.log(bookImg);
    const formData = new FormData();
    formData.append('bookImg', bookImg);
    formData.append('bookInfo', JSON.stringify(editProductState));
    console.log(formData);

    console.log(editProductState);

    axios('http://localhost:3001/dealer/dashboard/product-list', {
      method: 'put',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    }).then(function (response) {
      if (response.data.status === 200) {
        console.log(response.data);
        // localStorage.removeItem("token");
        setProductList(response.data.data);
      } else {
        /**
         * TODO: Show the message in the login page
         */
      }
    });
    setShowEditModal(false);
  };
  console.log(editProductState);

  return (
    <div>
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>Book information</Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookName"
                    value={editProductState.bookName}
                    onChange={changeHandler}
                    placeholder="Book Name"
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="authorName"
                    value={editProductState.authorName}
                    onChange={changeHandler}
                    placeholder="Author Name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisher"
                    value={editProductState.publisher}
                    onChange={changeHandler}
                    placeholder="publisher"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={editProductState.price}
                    onChange={changeHandler}
                    placeholder="Price"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicUserName">
                  <Form.Label>Offer in (%)</Form.Label>
                  <Form.Control
                    type="text"
                    name="offer"
                    value={editProductState.offer}
                    onChange={changeHandler}
                    placeholder="Offer"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Modal.Header></Modal.Header>
            <Row>
              <Col>
                <Form.Group controlId="formBasicCpassword">
                  <Form.Label>Edition</Form.Label>
                  <Form.Control
                    type="text"
                    name="edition"
                    value={editProductState.edition}
                    onChange={changeHandler}
                    placeholder="Edition"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCpassword">
                  <Form.Label>No.Pages</Form.Label>
                  <Form.Control
                    type="text"
                    name="noPages"
                    value={editProductState.noPages}
                    onChange={changeHandler}
                    placeholder="No.Pages"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicLanguage">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    name="language"
                    value={editProductState.language}
                    onChange={changeHandler}
                    placeholder="Language"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="discription"
                value={editProductState.discription}
                onChange={changeHandler}
                rows={3}
              />
            </Form.Group>
            <div className="previewParent">
              <div>
                <div>
                  <select
                    name="category"
                    id="category"
                    onChange={changeHandler}
                    value={editProductState.category}
                  >
                    <option value={editProductState.category}>
                      {editProductState.category}
                    </option>
                    {categoryNames.map((category) => (
                      <option value={category.name}>{category.name}</option>
                    ))}
                    {/* <option value="children'sBook">Children's Books</option>
                    <option value="comics&Manga">Comics & Manga</option>
                    <option value="crime,Thriller&Mystery">
                      Crime, Thriller & Mystery
                    </option>
                    <option value="health&PersonalDevelopment">
                      Health & Personal Development
                    </option>
                    <option value="science&Technology">
                      Science & Technology{' '}
                    </option>
                    <option value="action&Adventure">
                      Action & Adventure{' '}
                    </option> */}
                  </select>
                </div>
                <Form>
                  <Form.Group>
                    <Form.File
                      id="exampleFormControlFile1"
                      label="Example file input"
                      //   value={editProductState.image}
                      onChange={uploadImg}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className="imagePreview">
                <img
                  style={{width: '100px', height: 'auto'}}
                  src={`http://localhost:3001/${editProductState.imageUrl}`}
                  alt=""
                />
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveProduct}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductEdit;
