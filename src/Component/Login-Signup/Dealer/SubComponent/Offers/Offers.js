import React, {useEffect} from 'react';
import {Form, Button, Table} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import cc from 'coupon-code';
import axios from 'axios';

import Header from '../Header/Header';
import DashboardPanel from '../DashboardPanel/DashboardPanel';
import './Offers.css';
import {useState} from 'react';

function Offers({
  dealerName,
  setDealerName,
  dashboardContent,
  setChooseContent,
  mainUrl,
  dealerLoginCrentials,
  setdealerLoginCrentials,
}) {
  const history = useHistory();
  const [couponForm, setCouponForm] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [inputOfferList, setInputOfferList] = useState({
    couponCode: '',
    couponOfferAmount: '',
    expiredDate: '',
    status: 'Active',
  });
  const [offerList, setofferList] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem('dealerToken');
    let profilePic = localStorage.getItem('dealerProfilePic');
    let dealerName = localStorage.getItem('dealerName');
    setDealerName(dealerName);
    setdealerLoginCrentials({
      ...dealerLoginCrentials,
      ['profilePic']: profilePic,
    });
    // console.log(token);
    if (token) {
      axios
        .get('http://3.137.34.100:3001/dealer/dashboard/getallcoupon', {
          params: {
            name: dealerName,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            setofferList(response.data.result);
          }
        });
    } else {
      history.push('/dealer');
    }
  }, []);

  const couponGenerate = () => {
    let coupon = cc.generate({part: 4});
    setCouponForm(coupon);
    setIsDisable(true);
    setInputOfferList({...inputOfferList, ['couponCode']: coupon});
    console.log(coupon);
  };
  const inputHandler = (event) => {
    console.log('input event handler');
    setInputOfferList({
      ...inputOfferList,
      [event.target.name]: event.target.value,
    });
  };

  const activeCouponHandler = (event) => {
    event.preventDefault();
    setIsDisable(false);
    setCouponForm('');
    setofferList([...offerList, inputOfferList]);
    axios
      .post(
        'http://3.137.34.100:3001/dealer/dashboard/couponoffer',
        inputOfferList,
        {
          params: {
            dealerName: dealerName,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  const editCoupon = (id) => {};
  const removeCoupon = (id) => {
    console.log(id);
    axios
      .delete('http://3.137.34.100:3001/dealer/dashboard/couponoffer', {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log(response.data);
          let copyData = [...offerList];
          copyData = copyData.filter((data) => data._id != id);
          setofferList(copyData);
        }
      });
  };

  console.log(inputOfferList);

  return (
    <div className="offers">
      <div className="header">
        <Header dealerName={dealerName} />
      </div>
      <div className="panelContent" style={{display: 'flex'}}>
        <div>
          <DashboardPanel
            dashboardContent={dashboardContent}
            setChooseContent={setChooseContent}
            dealerLoginCrentials={dealerLoginCrentials}
            mainUrl={mainUrl}
          />
        </div>
        <div>
          <div className="offerForm">
            <Form onSubmit={activeCouponHandler}>
              <Form.Group controlId="formBasicEmail">
                <div className="generate">
                  <Form.Label>Coupon code</Form.Label>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={couponGenerate}
                    disabled={isDisable}
                  >
                    Generate
                  </Button>
                </div>
                <Form.Control
                  type="text"
                  name="couponCode"
                  value={couponForm}
                  placeholder="Click to generate"
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formBasicOffer">
                <Form.Label> Add Offer in %</Form.Label>
                <Form.Control
                  name="couponOfferAmount"
                  type="number"
                  placeholder="eg:- 20"
                  onChange={inputHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicOffer">
                <Form.Label> Expiry Time </Form.Label>
                <Form.Control
                  name="expiredDate"
                  type="date"
                  onChange={inputHandler}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <br />
          <div className="table">
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Status</th>
                  <th>Coupon</th>
                  <th>Offer Amount(%)</th>
                  <th>Expired Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {offerList.map((data, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td> {data.status} </td>
                    <td> {data.couponCode} </td>
                    <td> {data.couponOfferAmount} </td>
                    <td> {data.expiredDate} </td>
                    <td>
                      <i
                        className="fa fa-edit"
                        aria-hidden="true"
                        onClick={() => editCoupon(data._id)}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                        onClick={() => removeCoupon(data._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
