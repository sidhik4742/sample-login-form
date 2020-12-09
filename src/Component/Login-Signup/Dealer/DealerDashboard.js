import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './DealerDashboard.css';
import {Bar} from 'react-chartjs-2';

import Header from './SubComponent/Header/Header';

import UsersDashboardTable from '../../subComponent/UsersDashboardTable/UsersDashboardTable';
import DashboardPanel from './SubComponent/DashboardPanel/DashboardPanel';
import DashboardContent from '../../subComponent/DashboardContent/DashboardContent';
import OrderHistory from './SubComponent/OrderHistory/OrderHistory';
import Axios from 'axios';

function DealerDashboard({
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
  const history = useHistory();
  const [customerList, setCustomerList] = useState([]);
  const [usersVsProduct, setUsersVsProduct] = useState(true);
  const [labels, setLabels] = useState();
  const [dataSet, setDataSet] = useState();
  const [cardData, setCardData] = useState([
    {
      cardName: '',
      cardValue: null,
    },
    {
      cardName: '',
      cardValue: null,
    },
    {
      cardName: '',
      cardValue: null,
    },
  ]);

  useEffect(() => {
    console.log('====================================');
    console.log('use effect from the dealer dashboard');
    console.log('====================================');
    let token = localStorage.getItem('dealerToken');
    let profilePic = localStorage.getItem('dealerProfilePic');
    setDealerName(localStorage.getItem('dealerName'));
    setdealerLoginCrentials({
      ...dealerLoginCrentials,
      ['profilePic']: profilePic,
    });
    console.log(token);
    if (token) {
      let allDetails;
      axios
        .get('http://3.137.34.100:3001/dealer/dashboard/getalldetailscount', {
          params: {
            dealerName: dealerName,
          },
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.status === 200) {
            allDetails = response.data.data;
            console.log(response.data.data);
            setLabels(allDetails.date);
            setDataSet(allDetails.amount);

            setCardData([
              {
                cardName: 'Total Customers',
                cardValue: allDetails.customerCount,
              },
              {
                cardName: 'Total Product',
                cardValue: allDetails.productCount,
              },
              {
                cardName: 'Total Customers',
                cardValue: allDetails.totalSaleAmount,
              },
            ]);

            return () => {};

            console.log(cardData);
          } else {
            /**
             * TODO: Show the message in the login page
             */
          }
        });
      history.push('/dealer/dashboard');
    } else {
      history.push('/dealer');
    }
  }, [!cardData]);

  // console.log(cardData);

  return (
    <div>
      <div className="panel">
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
          <DashboardContent
            cardData={cardData}
            labels={labels}
            dataSet={dataSet}
          />
        </div>
      </div>
    </div>
  );
}

export default DealerDashboard;
