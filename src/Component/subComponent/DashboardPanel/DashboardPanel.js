import React from 'react';
import {useHistory} from 'react-router-dom';
import './DashboardPanel.css';

function DashboardPanel({adminDashboardContent, setAdminChooseContent}) {
  const history = useHistory();
  console.log(adminDashboardContent);

  const dashboardContentAction = (index) => {
    console.log(index);
    setAdminChooseContent(index);
    if (index === 0) {
      history.push('/admin/dashboard');
    } else if (index === 1) {
      history.push('/admin/dashboard/dealerlist');
    } else if (index === 2) {
      history.push('/admin/dashboard/userslist');
    } else if (index === 3) {
      history.push('/admin/dashboard/category');
    } else if (index === 4) {
      history.push('/admin/dashboard/report');
    }
  };

  return (
    <div className="dashboardPanel">
      <div className="dashboard">
        {adminDashboardContent.map((content, index) => (
          <div key={index}>
            <p onClick={() => dashboardContentAction(index)}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPanel;
