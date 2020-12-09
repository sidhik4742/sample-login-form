import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';

import AdminLogin from './Component/Login-Signup/Admin/AdminLogin';
import AdminDashboard from './Component/Login-Signup/Admin/AdminDashboard';
import DealerDashboardTable from './Component/subComponent/DealerDashboardtable/DealerDashboardtable';
import DealerLogin from './Component/Login-Signup/Dealer/DealerLogin';
import DealerSignup from './Component/Login-Signup/Dealer/DealerSignup';
import DealerDashboard from './Component/Login-Signup/Dealer/DealerDashboard';
import CustomerSignup from './Component/Login-Signup/Customer/CustomerSignup';
import CustomerLogin from './Component/Login-Signup/Customer/CustomerLogin';
import CustomerShipAddress from './Component/Login-Signup/Customer/CustomerShipAddress';
import CustomerLanding from './Component/Login-Signup/Customer/CustomerLanding';
import ViewCart from './Component/Login-Signup/Customer/subComponent/ViewCart/ViewCart';
import Chekout from './Component/Login-Signup/Customer/subComponent/Chekout/Chekout';
import PaymentMethod from './Component/Login-Signup/Customer/subComponent/PaymentMethod/PaymentMethod';
import PlaceOrder from './Component/Login-Signup/Customer/subComponent/PlaceOrder/PlaceOrder';
import AccountInfo from './Component/Login-Signup/Customer/subComponent/AccountInfo/AccountInfo';
import OrderHistory from './Component/Login-Signup/Dealer/SubComponent/OrderHistory/OrderHistory';
import DashboardContent from './Component/subComponent/DashboardContent/DashboardContent';
import DealerRoot from './Component/Login-Signup/Dealer/SubComponent/DealerRoot/DealerRoot';
import ProductDashboardTable from './Component/Login-Signup/Dealer/SubComponent/ProductDashboardTable/ProductDashboardTable';
import UserDashboardTable from './Component/subComponent/UsersDashboardTable/UsersDashboardTable';
import Report from './Component/subComponent/Report/Report';
import CategoryManagement from './Component/subComponent/CategoryManagement/CategoryManagement';
import Offers from './Component/Login-Signup/Dealer/SubComponent/Offers/Offers';


function App() {
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    cPassword: '',
  });
  const [customerPageStatus, setCustomerPageStatus] = useState({
    DashboardPanel: true,
    productList: true,
    viewBook: false,
    viewCart: false,
  });
  const [customerName, setCustomerName] = useState(null);
  const [cartStatus, setCartStatus] = useState(false);
  const [mainUrl] = useState('http://3.137.34.100:3001/');
  const [cartDetailsCpy, setCartDetailsCpy] = useState([]);
  const [cartHistory, setCartHistory] = useState([]);
  const [shipAddress, setShipAddress] = useState([]);
  const [paymentOption, setPaymentOptions] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [customerLoginStatus, setCustomerLoginStatus] = useState(false);
  const [customerAccountStatus, setCustomerAccountStatus] = useState(false);
  const [orderDateAndPaymentMethod, setOrderDateAndPaymentMethod] = useState(
    {}
  );
  const [viewBookDetails, setViewBookDetails] = useState([]);
  const [dealerName, setDealerName] = useState();
  const [chooseContent, setChooseContent] = useState(0);
  const [dealerLoginCrentials, setdealerLoginCrentials] = useState({});
  const [productList, setProductList] = useState([]);
  const [accountVsOrder, setAccountVsOrder] = useState(true);
  const [cartCount, setCartCount] = useState(null);

  const [orderDetails, setOrderDetails] = useState([
    {
      orderId: 'Michael Bruce',
      bookName: 'Javascript Developer',
      quantity: 'Singapore',
      price: '29',
      totalPrice: '2011/06/27',
      orderDate: '$183',
      pymenttype: 'paypal',
    },
  ]);
  const [filterData, setFilterData] = useState([]);
  const [dashboardContent, setDashboardContent] = useState([
    'Dashboard',
    'Product List',
    'Order History',
    'Offers',
    'About',
  ]);

  const [adminchooseContent, setAdminChooseContent] = useState(0);
  const [adminDashboardContent, setAdminDashboardContent] = useState([
    'Dashboard',
    'Dealers List',
    'Users List',
    'Category',
    'Report',
  ]);
  const [dealerDatas, setDealerDatas] = useState([]);
  const [userStatus, setUserStatus] = useState();
  console.log('====================================');
  console.log('App.js');
  console.log('====================================');
  return (
    <div className="mainPage">
      <Router>
        {/* <Switch>
          <Route path="/admin" exact>
            <AdminLogin />
          </Route>
          <Route path="/admin/dashboard/" exact>
            <AdminDashboard
              adminchooseContent={adminchooseContent}
              setAdminChooseContent={setAdminChooseContent}
              adminDashboardContent={adminDashboardContent}
              setAdminDashboardContent={setAdminDashboardContent}
              setDealerDatas={setDealerDatas}
              dealerDatas={dealerDatas}
            />
          </Route>
          <Route path="/admin/dashboard/dealerlist" exact>
            <DealerDashboardTable
              dealerDatas={dealerDatas}
              setDealerDatas={setDealerDatas}
              adminDashboardContent={adminDashboardContent}
              setAdminChooseContent={setAdminChooseContent}
              setUserStatus={setUserStatus}
              userStatus={userStatus}
            />
          </Route>
          <Route path="/admin/dashboard/userslist" exact>
            <UserDashboardTable
              adminDashboardContent={adminDashboardContent}
              setAdminDashboardContent={setAdminDashboardContent}
              setAdminChooseContent={setAdminChooseContent}
              setUserStatus={setUserStatus}
              userStatus={userStatus}
            />
          </Route>
          <Route path="/admin/dashboard/category" exact>
            <CategoryManagement
              adminDashboardContent={adminDashboardContent}
              setAdminDashboardContent={setAdminDashboardContent}
              setAdminChooseContent={setAdminChooseContent}
              setUserStatus={setUserStatus}
              userStatus={userStatus}
            />
          </Route>
          <Route path="/admin/dashboard/report" exact>
            <Report
              adminDashboardContent={adminDashboardContent}
              setAdminDashboardContent={setAdminDashboardContent}
              setAdminChooseContent={setAdminChooseContent}
              setUserStatus={setUserStatus}
              userStatus={userStatus}
              orderDetails={orderDetails}
              setOrderDetails={setOrderDetails}
              setFilterData={setFilterData}
              filterData={filterData}
            />
          </Route>
        </Switch> */}
        {/* <Switch>
          <Route path="/dealer" exact>
            <DealerLogin />
          </Route>
          <Route path="/dealer/signup" exact>
            <DealerSignup />
          </Route>
          <Route path="/dealer/dashboard" exact>
            <DealerDashboard
              mainUrl={mainUrl}
              setOrderDetails={setOrderDetails}
              orderDetails={orderDetails}
              dealerName={dealerName}
              setDealerName={setDealerName}
              dashboardContent={dashboardContent}
              setChooseContent={setChooseContent}
              chooseContent={chooseContent}
              dealerLoginCrentials={dealerLoginCrentials}
              setdealerLoginCrentials={setdealerLoginCrentials}
            />
          </Route>
          <Route path="/dealer/dashboard/orderhistory" exact>
            <OrderHistory
              mainUrl={mainUrl}
              setOrderDetails={setOrderDetails}
              orderDetails={orderDetails}
              dealerName={dealerName}
              setDealerName={setDealerName}
              dashboardContent={dashboardContent}
              setChooseContent={setChooseContent}
              chooseContent={chooseContent}
              dealerLoginCrentials={dealerLoginCrentials}
              setdealerLoginCrentials={setdealerLoginCrentials}
            />
          </Route>
          <Route path="/dealer/dashboard/productlist" exact>
            <ProductDashboardTable
              mainUrl={mainUrl}
              setOrderDetails={setOrderDetails}
              orderDetails={orderDetails}
              dealerName={dealerName}
              setDealerName={setDealerName}
              dashboardContent={dashboardContent}
              setChooseContent={setChooseContent}
              chooseContent={chooseContent}
              dealerLoginCrentials={dealerLoginCrentials}
              setdealerLoginCrentials={setdealerLoginCrentials}
            />
          </Route>
          <Route path="/dealer/dashboard/offers" exact>
            <Offers
              dealerName={dealerName}
              setDealerName={setDealerName}
              dashboardContent={dashboardContent}
              setChooseContent={setChooseContent}
              dealerLoginCrentials={dealerLoginCrentials}
              mainUrl={mainUrl}
              dealerLoginCrentials={dealerLoginCrentials}
              setdealerLoginCrentials={setdealerLoginCrentials}
            />
          </Route>
        </Switch> */}
        <Switch>
          <Route path="/" exact>
            <CustomerLanding
              customerName={customerName}
              mainUrl={mainUrl}
              setCustomerName={setCustomerName}
              setCartStatus={setCartStatus}
              cartStatus={cartStatus}
              customerLoginStatus={customerLoginStatus}
              setCustomerLoginStatus={setCustomerLoginStatus}
              customerPageStatus={customerPageStatus}
              setCustomerPageStatus={setCustomerPageStatus}
              setCustomerAccountStatus={setCustomerAccountStatus}
              viewBookDetails={viewBookDetails}
              setViewBookDetails={setViewBookDetails}
              setCartCount={setCartCount}
              cartCount={cartCount}
            />
          </Route>
          {/* <Route path="/viewcart" exact>
            <ViewCart
              mainUrl={mainUrl}
              cartDetailsCpy={cartDetailsCpy}
              setCartDetailsCpy={setCartDetailsCpy}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
              viewBookDetails={viewBookDetails}
              setViewBookDetails={setViewBookDetails}
              customerLoginStatus={customerLoginStatus}
              customerName={customerName}
              setCustomerAccountStatus={setCustomerAccountStatus}
            />
          </Route>
          <Route path="/checkout" exact>
            <Chekout
              cartDetailsCpy={cartDetailsCpy}
              setCartDetailsCpy={setCartDetailsCpy}
              shipAddress={shipAddress}
              setShipAddress={setShipAddress}
              setOrderDateAndPaymentMethod={setOrderDateAndPaymentMethod}
              orderDateAndPaymentMethod={orderDateAndPaymentMethod}
            />
          </Route>
          <Route path="/payMethod" exact>
            <PaymentMethod
              paymentOption={paymentOption}
              setPaymentOptions={setPaymentOptions}
              setOrderDateAndPaymentMethod={setOrderDateAndPaymentMethod}
              orderDateAndPaymentMethod={orderDateAndPaymentMethod}
            />
          </Route>
          <Route path="/placeOrder" exact>
            <PlaceOrder
              shipAddress={shipAddress}
              setShipAddress={setShipAddress}
              cartDetailsCpy={cartDetailsCpy}
              paymentOption={paymentOption}
              setPaymentOptions={setPaymentOptions}
              mainUrl={mainUrl}
              totalAmount={totalAmount}
              setTotalAmount={setTotalAmount}
              setOrderDateAndPaymentMethod={setOrderDateAndPaymentMethod}
              orderDateAndPaymentMethod={orderDateAndPaymentMethod}
              setCustomerPageStatus={setCustomerPageStatus}
              setAccountVsOrder={setAccountVsOrder}
            />
          </Route>
          <Route path="/accountInfo" exact>
            <AccountInfo
              customerLoginStatus={customerLoginStatus}
              setCustomerLoginStatus={setCustomerLoginStatus}
              customerPageStatus={customerPageStatus}
              setCustomerPageStatus={setCustomerPageStatus}
              customerName={customerName}
              cartStatus={cartStatus}
              setCartStatus={setCartStatus}
              customerAccountStatus={customerAccountStatus}
              setCustomerAccountStatus={setCustomerAccountStatus}
              mainUrl={mainUrl}
              viewBookDetails={viewBookDetails}
              accountVsOrder={accountVsOrder}
              setAccountVsOrder={setAccountVsOrder}
            />
          </Route>
          <Route path="/login" exact>
            <CustomerLogin setCustomerName={setCustomerName} />
          </Route>
          <Route path="/signup" exact>
            <CustomerSignup
              userSignUpDetails={userSignUpDetails}
              setUserSignUpDetails={setUserSignUpDetails}
            />
          </Route>
          <Route path="/signup/ship-address">
            <CustomerShipAddress
              userSignUpDetails={userSignUpDetails}
              setUserSignUpDetails={setUserSignUpDetails}
            />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
