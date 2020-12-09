import axios from 'axios';
import React from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import {useHistory} from 'react-router-dom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import './ViewBook.css';

const ViewBook = ({
  viewBookDetails,
  setViewBookDetails,
  mainUrl,
  setCustomerPageStatus,
  setCartCount,
}) => {
  console.log(viewBookDetails);
  const history = useHistory();

  const goBack = () => {
    setCustomerPageStatus({
      ['DashboardPanel']: true,
      ['productList']: true,
      ['viewBook']: false,
    });
  };

  const addToCart = () => {
    let token = localStorage.getItem('customerToken');
    console.log(token);
    let userStatus = localStorage.getItem('userStatus');
    if (token != null) {
      console.log('add to cart without login');
      let customerName = localStorage.getItem('customerName');

      let viewBookDetailsCopy = [...viewBookDetails];
      viewBookDetailsCopy.push({customer: customerName});
      console.log(viewBookDetailsCopy);

      axios
        .post('http://3.137.34.100:3001/addtocart', viewBookDetailsCopy)
        .then(function (response) {
          console.log(response.data);
          axios
            .get('http://3.137.34.100:3001/cartcount', {
              params: {
                customerName: customerName,
              },
            })
            .then((response) => {
              if (response.data.status === 200) {
                setCartCount(response.data.data);
              } else {
              }
              console.log(response.data);
            });
        });
    } else {
      history.push('/');
    }
  };

  console.log(viewBookDetails);

  return (
    <div className="viewBookParent">
      <div>
        <i
          className="fa fa-chevron-circle-left backbutton"
          aria-hidden="true"
          onClick={goBack}
        ></i>
      </div>
      <div className="addToCart">
        <button onClick={addToCart}>Add to cart</button>
      </div>
      <div className="viewBook">
        <div className="image">
          <InnerImageZoom src={mainUrl + viewBookDetails[0].imageUrl} />
        </div>
        <div className="content">
          <div className="heading">
            <h2>{viewBookDetails[0].bookName}</h2>
            <h5> Author name : {viewBookDetails[0].authorName} </h5>
            <h5> Publisher : {viewBookDetails[0].publisher} </h5>
          </div>
          <div className="reviewAndRating">
            <h2>Review&Rating</h2>
            <div className="parent">
              <div className="rating">
                <h5>4.5</h5>
              </div>
              <div className="review">
                <h5>Based on the customer review</h5>
              </div>
            </div>
          </div>
          <div className="offers">
            <h2>Offer and Pricing</h2>
            <div className="offerParent">
              <h1 className="orginalPrice">
                {' '}
                &#8377;{viewBookDetails[0].price}{' '}
              </h1>
              <h1 className="offerPrice">
                {' '}
                &#8377;
                {viewBookDetails[0].price -
                  (viewBookDetails[0].price * viewBookDetails[0].offer) /
                    100}{' '}
              </h1>
            </div>
          </div>
          <div className="bookInfo">
            <h2>Book Informations</h2>
            <h5> Edition : {viewBookDetails[0].edition} </h5>
            <h5> No.Pages : {viewBookDetails[0].noPages} </h5>
            <h5> Language : {viewBookDetails[0].language} </h5>
          </div>
        </div>
      </div>
      <div className="discription">
        <h2>Discription</h2>
        <div>
          <p> {viewBookDetails[0].discription} </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
