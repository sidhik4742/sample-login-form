import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "../Signup.css";

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

function CustomerSignup() {
  const history = useHistory();
  const [upImg, setUpImg] = useState();
  const [dealerSignupData, setDealerSignupData] = useState();
  const [dp, setDp] = useState();
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const styleRef = useRef(null);
  const closeCropSection = useRef(null);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

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

  const changeHandler = (event) => {
    setDealerSignupData({
      ...dealerSignupData,
      [event.target.name]: event.target.value,
    });
  };

  const uploadImage = (event) => {
    // console.log(styleRef.current);
    styleRef.current.style.display = "none";
    closeCropSection.current.style.display = "block";
    console.log("Upload image");
    let type = event.target.files[0].type;
    if (type == "image/jpeg" || type == "image/jpg" || type == "image/png") {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profilePic", dp);
    formData.append("dealerSignupData", JSON.stringify(dealerSignupData));
    axios("http://3.137.34.100:3001/dealer/signup", {
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    }).then(function (response) {
      console.log(response.data);
      if (response.data.status === 200) {
        history.push("/dealer");
      } else {
        /**
         * TODO: Show the message in the login page
         */
      }
    });
  };

  const getResizedCanvas = (canvas, newWidth, newHeight) => {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
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
        console.log("====================================");
        console.log(blob);
        console.log("====================================");
        // const previewUrl = window.URL.createObjectURL(blob);
        setDp(blob);
        // const anchor = document.createElement("a");
        // anchor.download = "cropPreview.png";
        // anchor.href = URL.createObjectURL(blob);
        // anchor.click();

        // window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      1
    );
    closeCropSection.current.style.display = "none";
    styleRef.current.style.display = "block";
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  // console.log(completedCrop);
  console.log(dp);

  return (
    <div className="signupPage">
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
      <div className="signupForm" ref={styleRef}>
        <Form onSubmit={submitForm}>
          <div className="img-div">
            <label htmlFor="uploadImage">
              <img
                className="image"
                src={
                  dp
                    ? URL.createObjectURL(dp)
                    : "https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg"
                }
                alt=""
              />
            </label>
            <input
              type="file"
              id="uploadImage"
              onChange={uploadImage}
              style={{ display: "none" }}
              required
            />
          </div>
          <Row>
            <Col>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={changeHandler}
                  placeholder="Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  onChange={changeHandler}
                  placeholder="User name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasiccPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="cPassword"
                  onChange={changeHandler}
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CustomerSignup;
