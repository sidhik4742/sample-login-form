import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
import './AdminDashboard.css';

import Header from '../../subComponent/Header/Header';
import DashboardPanel from '../../subComponent/DashboardPanel/DashboardPanel';
import DashboardContent from '../../subComponent/DashboardContent/DashboardContent';

function AdminDashboard({
  setAdminChooseContent,
  adminchooseContent,
  adminDashboardContent,
  setAdminDashboardContent,
  dealerDatas,
  setDealerDatas,
}) {
  const history = useHistory();
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
    let token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      axios.defaults.headers.common['auth'] = token;
      axios
        .get('http://3.137.34.100:3001/admin/dashboard')
        .then(function (response) {
          console.log(response.data.data);
          if (response.data.status === 200) {
            // localStorage.removeItem("token");
            setDealerDatas(response.data.data);
          } else {
            /**
             * TODO: Show the message in the login page
             */
          }
        });

      axios
        .get('http://3.137.34.100:3001/admin/dashboard/getalldetailscount')
        .then(function (response) {
          console.log(response.data);
          if (response.data.status === 200) {
            let allDetails = response.data.data;
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
                cardName: 'Total Dealer',
                cardValue: allDetails.dealerCount,
              },
            ]);
          } else {
            /**
             * TODO: Show the message in the login page
             */
          }
        });
    } else {
      history.push('/admin');
    }
  }, [!dealerDatas]);

  console.log(dealerDatas);

  return (
    <div className="panel">
      <div className="header">
        <Header />
      </div>
      <div className="panelContent">
        <div>
          <DashboardPanel
            adminDashboardContent={adminDashboardContent}
            setAdminChooseContent={setAdminChooseContent}
          />
        </div>
        <div>
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

export default AdminDashboard;
