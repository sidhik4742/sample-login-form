import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './DashboardPanel.css';
import axios from 'axios';

// Increase pixel density for crop preview quality on retina screens.
const pixelRatio = window.devicePixelRatio || 1;

function DashboardPanel({
  dashboardContent,
  setdashboardContent,
  allProduct,
  setFilterProduct,
  filterProduct,
  customerAccountStatus,
  setCustomerAccountStatus,
  setAccountVsOrder,
  mainUrl,
}) {
  console.log(customerAccountStatus);
  const history = useHistory();
  // console.log(allProduct);

  const [dp, setDp] = useState();
  const [crop, setCrop] = useState({unit: '%', width: 30, aspect: 16 / 9});
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const styleRef = useRef(null);
  const closeCropSection = useRef(null);
  const [upImg, setUpImg] = useState();

  let profilepicture = dp
    ? URL.createObjectURL(dp)
    : mainUrl + localStorage.getItem('customerDp');
  console.log(profilepicture);

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

  const uploadImage = (event) => {
    // console.log(styleRef.current);
    // styleRef.current.style.display = 'none';
    closeCropSection.current.style.display = 'block';
    console.log('Upload image');
    let type = event.target.files[0].type;
    if (type == 'image/jpeg' || type == 'image/jpg' || type == 'image/png') {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const customerAccountHandler = (content) => {
    console.log(content);
    if (content === 'Account') {
      setAccountVsOrder(true);
    } else if (content === 'My order') {
      setAccountVsOrder(false);
    }
  };

  const dashboardContentAction = (content) => {
    console.log('This is filtered data function');
    // history.push("/dashboard");
    let productFilter = [];
    if (content === 'viewAll') {
      // console.log(content);
      setFilterProduct(allProduct);
    } else {
      allProduct.forEach((product) => {
        if (
          product.category.toLowerCase().split(' ').join('') ===
          content.toLowerCase().split(' ').join('')
        ) {
          productFilter.push(product);
        }
      });
      setFilterProduct(productFilter);
    }
    // console.log(productFilter);
  };

  const generateDownload = (previewCanvas, crop) => {
    if (!crop || !previewCanvas) {
      return;
    }

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

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

    canvas.toBlob(
      (blob) => {
        console.log('====================================');
        console.log(blob);
        console.log('====================================');
        // const previewUrl = window.URL.createObjectURL(blob);
        setDp(blob);
      },
      'image/png',
      1
    );
    closeCropSection.current.style.display = 'none';
    // styleRef.current.style.display = 'block';
    let customerName = localStorage.getItem('customerName');
    console.log(dp, customerName);
    axios.defaults.headers.common['customername'] = customerName;
    const formData = new FormData();
    formData.append('profilePic', dp);
    axios('http://3.137.34.100:3001/dashboard/profilepic', {
      method: 'put',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    }).then((response) => {
      console.log(response.data.data.ProfilePictureUrl);
      let customerDp = response.data.data.ProfilePictureUrl;
      localStorage.setItem('customerDp', customerDp);
    });
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  return (
    <div className="dashboardPanel">
      <div className="dashboard">
        {customerAccountStatus ? (
          <div className="profilepicture">
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
            <div className="img-div" ref={styleRef}>
              <label htmlFor="uploadImage">
                <img
                  className="image"
                  src={
                    profilepicture
                      ? profilepicture
                      : 'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg'
                  }
                  alt="Loding..."
                />
              </label>
              <input
                type="file"
                id="uploadImage"
                onChange={uploadImage}
                style={{display: 'none'}}
                required
              />
            </div>
            {dashboardContent.map((content, index) => (
              <div key={index}>
                <p onClick={() => customerAccountHandler(content)}>{content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p onClick={() => dashboardContentAction('viewAll')}>All</p>
            {dashboardContent.map((content, index) => (
              <div key={index}>
                <p onClick={() => dashboardContentAction(content.name)}>{content.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPanel;
