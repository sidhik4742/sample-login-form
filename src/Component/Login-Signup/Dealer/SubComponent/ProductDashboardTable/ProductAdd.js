import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import './productAdd.css';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

function ProductAdd({
  productList,
  setProductList,
  showAddModal,
  setShowAddModal,
  setAddProductState,
  addProductState,
  categoryNames,
}) {
  const [bookInfo, setBookInfo] = useState({});
  const [bookImg, setBookImg] = useState();
  const [bookImgCopy, setBookImgCopy] = useState(); //used temp
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const styleRef = useRef(null);
  const closeCropSection = useRef(null);
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({unit: '%', width: 30, aspect: 16 / 9});

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleX,
      crop.width * scaleX,
      crop.height * scaleX,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const handleClose = () => {
    setShowAddModal(false);
  };
  const changeHandler = (event) => {
    setAddProductState({
      ...addProductState,
      [event.target.name]: event.target.value,
    });
  };
  const uploadImg = (event) => {
    closeCropSection.current.style.display = 'block';
    let type = event.target.files[0].type;
    if (type == 'image/jpeg' || type == 'image/jpg' || type == 'image/png') {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      console.log(event.target.files);
      reader.readAsDataURL(event.target.files[0]);
      // setBookImgCopy(event.target.files[0]);
      //   let imgUrl = URL.createObjectURL(event.target.files[0]);
    }
  };
  const saveDealer = () => {
    console.log(bookImg);

    const formData = new FormData();
    formData.append('bookImg', bookImg);
    formData.append('bookInfo', JSON.stringify(addProductState));
    console.log(formData);

    console.log(addProductState);

    axios('http://3.137.34.100:3001/dealer/dashboard/product-list', {
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    }).then(function (response) {
      console.log(response.data);
      if (response.data.status === 200) {
        // localStorage.removeItem("token");
        // let productListCopy = [...productList];
        // productListCopy.push(addProductState);
        // setProductList(productListCopy);
        setProductList(response.data.result.data);
      } else {
        /**
         * TODO: Show the message in the login page
         */
      }
    });
    setShowAddModal(false);
  };

  const getResizedCanvas = (canvas, newWidth, newHeight) => {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext('2d');
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      newWidth,
      newHeight
    );

    return tmpCanvas;
  };

  const generateDownload = (previewCanvas, crop) => {
    if (!crop || !previewCanvas) {
      return;
    }
    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      (blob) => {
        console.log('====================================');
        console.log(blob);
        console.log('====================================');
        // const previewUrl = window.URL.createObjectURL(blob);
        setBookImg(blob);
        // const anchor = document.createElement("a");
        // anchor.download = "cropPreview.png";
        // anchor.href = URL.createObjectURL(blob);
        // anchor.click();

        // window.URL.revokeObjectURL(previewUrl);
      },
      'image/png',
      1
    );
    closeCropSection.current.style.display = 'none';
    // styleRef.current.style.display = 'block';
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  console.log(addProductState);
  return (
    <div className="addProduct">
      <div className="imageCropSection" ref={closeCropSection}>
        <div className="imageCropCanvas">
          <div className="croppedScreen">
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
          </div>
          <div className="previewScreen">
            <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
            />
          </div>
        </div>
        <button
          type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() =>
            generateDownload(previewCanvasRef.current, completedCrop)
          }
        >
          OK
        </button>
      </div>
      <div className="addProductModel" ref={styleRef}>
        <Modal show={showAddModal} onHide={handleClose}>
          <Modal.Header closeButton>Book information</Modal.Header>
          <Modal.Body>
            <Form>
              <Container>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Book Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="bookName"
                        onChange={changeHandler}
                        placeholder="Book Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicUserName">
                      <Form.Label>Author Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="authorName"
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
                        onChange={changeHandler}
                        placeholder="publisher"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        onChange={changeHandler}
                        placeholder="Price"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicUserName">
                      <Form.Label>Offer in (%) </Form.Label>
                      <Form.Control
                        type="number"
                        name="offer"
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
                        onChange={changeHandler}
                        placeholder="Edition"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicCpassword">
                      <Form.Label>No.Pages</Form.Label>
                      <Form.Control
                        type="number"
                        name="noPages"
                        onChange={changeHandler}
                        placeholder="No.Pages"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Language</Form.Label>
                      <Form.Control
                        type="text"
                        name="language"
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
                        value={addProductState.category}
                      >
                        <option value="">Choose category</option>
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
                          onChange={uploadImg}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  <div className="imagePreview">
                    <img
                      id="imagePreview"
                      src={bookImg ? URL.createObjectURL(bookImg) : null}
                      alt=""
                    />
                  </div>
                </div>
              </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveDealer}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ProductAdd;
