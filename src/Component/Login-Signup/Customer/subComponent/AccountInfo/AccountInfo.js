import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import AccountDetails from '../AccountDetails/AccountDetails';
import DashboardPanel from '../DashboardPanel/DashboardPanel';
import Header from '../Header/Header';
import MyOrder from '../MyOrder/MyOrder';

function AccountInfo({
  customerLoginStatus,
  setCustomerLoginStatus,
  customerPageStatus,
  setCustomerPageStatus,
  customerName,
  cartStatus,
  setCartStatus,
  customerAccountStatus,
  setCustomerAccountStatus,
  mainUrl,
  viewBookDetails,
  accountVsOrder,
  setAccountVsOrder,
}) {
  const history = useHistory();
  console.log('====================================');
  console.log(setCustomerAccountStatus);
  console.log('====================================');
  const [dashboardContent, setDashboardContent] = useState([
    'Account',
    'My order',
  ]);

  useEffect(() => {
    let token = localStorage.getItem('customerName');
    let userStatus = localStorage.getItem('userStatus');
    if (token != null && userStatus === 'Active') {
    } else {
      history.push('/');
    }
  }, []);

  return (
    <div>
      <Header
        customerLoginStatus={customerLoginStatus}
        setCustomerLoginStatus={setCustomerLoginStatus}
        customerPageStatus={customerPageStatus}
        setCustomerPageStatus={setCustomerPageStatus}
        customerName={customerName}
        cartStatus={cartStatus}
        setCartStatus={setCartStatus}
        setCustomerAccountStatus={setCustomerAccountStatus}
        customerAccountStatus={customerAccountStatus}
        viewBookDetails={viewBookDetails}
      />
      <div style={{display: 'flex'}}>
        <DashboardPanel
          customerAccountStatus={customerAccountStatus}
          setCustomerAccountStatus={setCustomerAccountStatus}
          dashboardContent={dashboardContent}
          setAccountVsOrder={setAccountVsOrder}
          mainUrl={mainUrl}
        />
        {accountVsOrder ? (
          <AccountDetails
            accountVsOrder={accountVsOrder}
            setAccountVsOrder={setAccountVsOrder}
          />
        ) : (
          <MyOrder mainUrl={mainUrl} />
        )}
      </div>
    </div>
  );
}

export default AccountInfo;
