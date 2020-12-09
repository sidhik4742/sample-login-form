import axios from 'axios';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';

import Header from '../Header/Header';
import DashboardPanel from '../DashboardPanel/DashboardPanel';

import './ViewCart.css';

const ViewCart = ({
  mainUrl,
  cartDetailsCpy,
  setCartDetailsCpy,
  totalAmount,
  setTotalAmount,
  viewBookDetails,
  setViewBookDetails,
  customerLoginStatus,
  customerName,
  setCustomerAccountStatus
}) => {
  const [cartDetails, setCartDetails] = useState([]);
  // const [offerAmount, setOfferAmount] = useState();
  const history = useHistory();
  const [customerPageStatus, setCustomerPageStatus] = useState({
    DashboardPanel: true,
    productList: true,
    viewBook: false,
    viewCart: false,
  });
  const quantityInputRef = useRef();
  let name = localStorage.getItem('customerName');

  useEffect(() => {
    let total = 0;
    axios
      .get('http://3.137.34.100:3001/viewcart', {
        params: {
          customerName: name,
        },
      })
      .then(function (responce) {
        let productDetails = [];
        console.log(responce.data);
        setCartDetails(responce.data.data);
        responce.data.data.forEach((element) => {
          element.offerTolerance = parseInt(
            (element.price * element.offer) / 100
          );
          element.offerPrice = (
            parseInt(element.price * element.quantity) - element.offerTolerance
          ).toFixed(0);
          total = total + parseInt(element.offerPrice);
          productDetails.push(element);
        });

        setCartDetailsCpy(productDetails);
        setTotalAmount(total);
      });
    return () => {
      setTotalAmount(total);
    };
  }, []);

  const totalAmountCala = () => {
    console.log(cartDetailsCpy);
    let newAmount = 0;
    cartDetailsCpy.forEach((element) => {
      newAmount = newAmount + parseInt(element.offerPrice);
      console.log(newAmount);
    });
    setTotalAmount(newAmount);
  };

  const decrement = (event) => {
    const btnId = event.target.dataset.id;
    const btnIndex = parseInt(event.target.dataset.index);
    let quantityFromInput = quantityInputRef.current.value;
    console.log(quantityFromInput);
    // let offerAmount = offerAmountCalc(btnIndex);

    let cartDetailsCopy = [...cartDetailsCpy];
    let {quantity} = cartDetailsCopy[btnIndex];
    let {offerTolerance} = cartDetailsCpy[btnIndex];
    console.log(btnId, btnIndex);
    console.log(quantity);
    if (quantity <= 1) {
      cartDetailsCopy[btnIndex].quantity = 1;
    } else {
      cartDetailsCopy[btnIndex].quantity =
        cartDetailsCopy[btnIndex].quantity - 1;
      cartDetailsCopy[btnIndex].offerPrice = (
        parseInt(cartDetailsCopy[btnIndex].price * (quantity - 1)) -
        offerTolerance
      ).toFixed(0);
    }
    totalAmountCala();
    setCartDetailsCpy(cartDetailsCopy);
  };
  const increment = (event) => {
    const btnId = event.target.dataset.id;
    const btnIndex = parseInt(event.target.dataset.index);

    let quantityFromInput = quantityInputRef.current;
    console.log(quantityFromInput);

    let cartDetailsCopy = [...cartDetailsCpy];
    let {quantity, offerTolerance} = cartDetailsCopy[btnIndex];
    console.log(quantity);
    // console.log(offerTolerance);
    if (quantity < 1) {
      cartDetailsCopy[btnIndex].quantity = 1;
    } else {
      cartDetailsCopy[btnIndex].quantity =
        cartDetailsCopy[btnIndex].quantity + 1;
      cartDetailsCopy[btnIndex].offerPrice = (
        parseInt(cartDetailsCopy[btnIndex].price * (quantity + 1)) -
        offerTolerance
      ).toFixed(0);
    }
    totalAmountCala();
    // console.log(cartDetailsCopy);
    setCartDetails(cartDetailsCopy);
  };

  const removeCartItem = (id) => {
    axios
      .delete('http://3.137.34.100:3001/viewcart', {
        params: {
          customerName: name,
          id: id,
        },
      })
      .then(function (responce) {
        if (responce.data.status === 200) {
          console.log(responce.data);
          let newproduct = cartDetailsCpy.filter(
            (rmvProduct) => rmvProduct._id != id
          );
          setCartDetailsCpy(newproduct);
        }
      });
  };

  const proceedToCheckout = () => {
    console.log(name);
    // axios
    //   .put("http://localhost:3001/viewcart", {
    //     name: name,
    //     data: cartDetailsCpy,
    //   })
    //   .then(function (response) {
    //     if (response.data.status === 200) {
    //     }
    //   });
    history.push('/checkout');
  };
  console.log(cartDetailsCpy);

  return (
    <div className="viewCart">
      <Header
        setCustomerPageStatus={setCustomerPageStatus}
        customerLoginStatus={customerLoginStatus}
        customerName={customerName}
        setCustomerAccountStatus={setCustomerAccountStatus}
      />
      <div className="subClass">
        <div className="totalCheckout">
          <h1> &#x20B9; {totalAmount}</h1>
          <button onClick={proceedToCheckout}> Procced to checkout</button>
        </div>
        {cartDetailsCpy.map((product, index) => (
          <div key={index} className="parentContent">
            <div className="image">
              <img src={mainUrl + product.imageUrl} alt="" />
            </div>
            <div className="details">
              <p>Author : {product.authorName}</p>
              <p>Publisher : {product.publisher}</p>
              <div className="price">
                <h4 className="oldRate">&#x20B9; {product.price} </h4>
                <h4>
                  {' '}
                  &#x20B9;
                  {product.offerPrice}
                </h4>{' '}
              </div>
              <div className="calculations">
                <button
                  type="button"
                  data-index={index}
                  data-id={product._id}
                  onClick={decrement}
                >
                  {' '}
                  -{' '}
                </button>
                <input
                  className="actionInput"
                  type="text"
                  value={product.quantity}
                  ref={quantityInputRef}
                  // onChange={changeHandler}
                  disabled
                />
                <button
                  type="button"
                  data-index={index}
                  data-id={product._id}
                  onClick={increment}
                >
                  {' '}
                  +{' '}
                </button>
              </div>
              <div className="actions">
                <button onClick={() => removeCartItem(product._id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCart;
