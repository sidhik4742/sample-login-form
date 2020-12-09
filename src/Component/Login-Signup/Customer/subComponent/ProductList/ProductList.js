import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Card, CardColumns, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import './ProductList.css';

const ProductList = ({
  allProduct,
  mainUrl,
  filterProduct,
  setFilterProduct,
  setCustomerPageStatus,
  customerPageStatus,
  setViewBookDetails,
  viewBookDetails,
  setCartCount,
}) => {
  const history = useHistory();
  console.log(filterProduct);

  const viewProduct = (id, bookName) => {
    console.log(id);
    setCustomerPageStatus({
      ['DashboardPanel']: false,
      ['productList']: false,
      ['viewBook']: true,
    });
    setViewBookDetails(allProduct.filter((product) => product._id === id));
  };

  const addToCart = (id, bookName) => {
    let token = localStorage.getItem('customerToken');
    console.log(token);
    let userStatus = localStorage.getItem('userStatus');
    if (token != null && userStatus === 'Active') {
      console.log('/eeeeeeeeeeeeeeeeee///');
      let customerName = localStorage.getItem('customerName');
      let addToCartData = allProduct.filter((product) => product._id === id);
      console.log(addToCartData);
      setViewBookDetails(addToCartData);
      // let viewBookDetailsCopy = addToCartData;
      addToCartData.push({customer: customerName});
      console.log(addToCartData);

      axios
        .post('http://3.137.34.100:3001/addtocart', addToCartData)
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

  return (
    <div className="landingPageProduct">
      {filterProduct.map((product, index) => (
        <div key={index} className="allProduct">
          <Card className="card" style={{width: '14rem'}}>
            <Card.Img
              onClick={() => viewProduct(product._id, product.bookName)}
              className="cardImage"
              variant="top"
              src={mainUrl + product.imageUrl}
            />
            <Card.Body>
              <Card.Title className="cardTitle">
                Book name : {product.bookName}
              </Card.Title>
              <Card.Text className="cardContent">
                {' '}
                Category :{product.category}
              </Card.Text>
              <Button
                onClick={() => addToCart(product._id, product.bookName)}
                variant="primary"
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
