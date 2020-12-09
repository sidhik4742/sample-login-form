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
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit';
import ProductDeleteModal from '../DeleteModal/ProductDeleteModal';
import './ProductDashboardTable.css';
import Header from '../Header/Header';
import DashboardPanel from '../DashboardPanel/DashboardPanel';

function ProductDashboardtable({
  mainUrl,
  setOrderDetails,
  orderDetails,
  dealerName,
  setDealerName,
  dashboardContent,
  setChooseContent,
  chooseContent,
  dealerLoginCrentials,
  setdealerLoginCrentials,
}) {
  const [productId, setProductId] = useState();
  const [dealerData, setDealerData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addProductState, setAddProductState] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    let dealerToken = localStorage.getItem('dealerToken');
    let dealerName = localStorage.getItem('dealerName');
    let profilePic = localStorage.getItem('dealerProfilePic');
    setDealerName(localStorage.getItem('dealerName'));
    setdealerLoginCrentials({
      ...dealerLoginCrentials,
      ['profilePic']: profilePic,
    });

    axios
      .get('http://3.137.34.100:3001/admin/dashboard/category')
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data.data);
          setCategoryNames(response.data.data);
        }
      });

    axios.defaults.headers.common['dealerauth'] = dealerToken;
    axios.defaults.headers.common['dealername'] = dealerName;
    axios
      .get('http://3.137.34.100:3001/dealer/dashboard/product-list')
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === 200) {
          setProductList(response.data.data);
        } else {
          /**
           * TODO: Show the message in the login page
           */
        }
      });
    console.log('rendering');
  }, [!productList]);

  const removeDealer = (id) => {
    console.log(id);
    setProductId(id);
    setShowDeleteModal(true);
  };

  const editProduct = (id) => {
    console.log(id);
    setProductId(id);
    setShowEditModal(true);
  };
  const addProduct = () => {
    console.log('add product');
    setAddProductState({
      ...addProductState,
      ['dealerName']: localStorage.getItem('dealerName'),
    });
    setShowAddModal(true);
  };

  // console.log(dealerData);
  return (
    <div>
      <div className="header">
        <Header dealerName={dealerName} />
      </div>
      <div className="panelContent">
        <DashboardPanel
          dashboardContent={dashboardContent}
          setChooseContent={setChooseContent}
          dealerLoginCrentials={dealerLoginCrentials}
          mainUrl={mainUrl}
        />
        <div className="dashboardTable">
          <div className="header">
            <h2>Product Table</h2>
            <Button variant="primary" onClick={addProduct}>
              Add product
            </Button>
          </div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>id</th>
                <th>BookName</th>
                <th>AuthorName</th>
                <th>Publisher</th>
                <th>Price</th>
                <th>Offer</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((data, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td> {data.bookName} </td>
                  <td> {data.authorName} </td>
                  <td> {data.publisher} </td>
                  <td> {data.price} </td>
                  <td> {data.offer} </td>
                  <td>
                    <img
                      src={`${mainUrl}${data.imageUrl}`}
                      alt={404}
                      srcset=""
                    />
                  </td>
                  <td>
                    <i
                      className="fa fa-edit"
                      aria-hidden="true"
                      onClick={() => editProduct(data._id)}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => removeDealer(data._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showDeleteModal ? (
            <div>
              <ProductDeleteModal
                setShowDeleteModal={setShowDeleteModal}
                showDeleteModal={showDeleteModal}
                productId={productId}
                productList={productList}
                setProductList={setProductList}
              />
            </div>
          ) : null}
          {showAddModal ? (
            <div>
              <ProductAdd
                productList={productList}
                setProductList={setProductList}
                showAddModal={showAddModal}
                setShowAddModal={setShowAddModal}
                setAddProductState={setAddProductState}
                addProductState={addProductState}
                categoryNames={categoryNames}
                setCategoryNames={setCategoryNames}
              />
            </div>
          ) : null}
          {showEditModal ? (
            <div>
              <ProductEdit
                productList={productList}
                setProductList={setProductList}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                productId={productId}
                categoryNames={categoryNames}
                setCategoryNames={setCategoryNames}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductDashboardtable;
