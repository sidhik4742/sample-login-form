import React from 'react';
import {useHistory} from 'react-router-dom';
import './DashboardPanel.css';

function DashboardPanel({
  dashboardContent,
  setChooseContent,
  dealerLoginCrentials,
  mainUrl,
}) {
  console.log(dealerLoginCrentials);
  const history = useHistory();
  console.log(dashboardContent);
  const dashboardContentAction = (index) => {
    console.log(index);
    setChooseContent(index);
    if (index === 0) {
      history.push('/dealer/dashboard');
    } else if (index === 1) {
      history.push('/dealer/dashboard/productlist');
    } else if (index === 2) {
      history.push('/dealer/dashboard/orderhistory');
    } else if (index === 3) {
      history.push('/dealer/dashboard/offers');
    }
  };

  return (
    <div className="dashboardPanel">
      <div className="dashboard">
        <div className="img-div">
          <label htmlFor="uploadImage">
            <img
              className="image"
              src={
                dealerLoginCrentials
                  ? mainUrl + dealerLoginCrentials.profilePic
                  : 'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg'
              }
              alt="Loding..."
            />
          </label>
        </div>
        {dashboardContent.map((content, index) => (
          <div key={index}>
            <p onClick={() => dashboardContentAction(index)}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPanel;
