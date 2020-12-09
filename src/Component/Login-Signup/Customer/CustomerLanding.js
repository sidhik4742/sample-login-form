import axios from 'axios';
import React, {useEffect, useState} from 'react';
import DashboardPanel from './subComponent/DashboardPanel/DashboardPanel';
import Header from './subComponent/Header/Header';
import ProductList from './subComponent/ProductList/ProductList';
import ViewBook from './subComponent/ViewBook/ViewBook';

function CustomerLanding({
  customerName,
  mainUrl,
  setCustomerName,
  cartStatus,
  setCartStatus,
  customerLoginStatus,
  setCustomerLoginStatus,
  customerPageStatus,
  setCustomerPageStatus,
  setCustomerAccountStatus,
  viewBookDetails,
  setViewBookDetails,
  setCartCount,
  cartCount,
}) {
  const [dashboardContent, setdashboardContent] = useState([
    "Children's Books",
    'Comics & Manga',
    'Crime, Thriller & Mystery',
    'Health & Personal Development',
    'Science & Technology',
    'Action & Adventure',
  ]);
  const [allProduct, setAllProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  console.log(cartStatus);

  useEffect(() => {
    axios.get('http://3.137.34.100:3001/allProduct').then(function (responce) {
      console.log(responce.data);
      if (responce.data.status === 200) {
        setAllProduct(responce.data.data);
        setFilterProduct(responce.data.data);
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
      } else {
        /**
         * TODO: something do here
         */
      }
    });

    axios
      .get('http://3.137.34.100:3001/admin/dashboard/category')
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setdashboardContent(response.data.data);
        }
      });

    let customerToken = localStorage.getItem('customerToken');
    let userStatus = localStorage.getItem('userStatus');
    console.log(customerToken);
    if (customerToken != null && userStatus === 'Active') {
      console.log('Logged!!!!!!!!!!!!');
      setCustomerName(localStorage.getItem('customerName'));
      setCustomerLoginStatus(true);
      setCustomerAccountStatus(true);
      setCartStatus(true);
    } else {
      setCustomerLoginStatus(false);
      setCustomerAccountStatus(false);
      setCartStatus(false);
    }
  }, [cartCount]);
  console.log(customerPageStatus);
  return (
    <div>
      <Header
        customerName={customerName}
        customerLoginStatus={customerLoginStatus}
        setCustomerLoginStatus={setCustomerLoginStatus}
        setCustomerPageStatus={setCustomerPageStatus}
        customerPageStatus={customerPageStatus}
        setCartStatus={setCartStatus}
        cartStatus={cartStatus}
        setCustomerAccountStatus={setCustomerAccountStatus}
        cartCount={cartCount}
      />
      <div style={{display: 'flex'}}>
        {customerPageStatus.DashboardPanel ? (
          <DashboardPanel
            dashboardContent={dashboardContent}
            setdashboardContent={setdashboardContent}
            allProduct={allProduct}
            setFilterProduct={setFilterProduct}
            filterProduct={filterProduct}
          />
        ) : null}
        {customerPageStatus.productList ? (
          <ProductList
            allProduct={allProduct}
            mainUrl={mainUrl}
            filterProduct={filterProduct}
            setFilterProduct={setFilterProduct}
            setCustomerPageStatus={setCustomerPageStatus}
            customerPageStatus={customerPageStatus}
            setViewBookDetails={setViewBookDetails}
            viewBookDetails={viewBookDetails}
            setCartCount={setCartCount}
          />
        ) : null}
        {customerPageStatus.viewBook ? (
          <ViewBook
            viewBookDetails={viewBookDetails}
            setViewBookDetails={setViewBookDetails}
            mainUrl={mainUrl}
            setCustomerPageStatus={setCustomerPageStatus}
            setCartCount={setCartCount}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CustomerLanding;
