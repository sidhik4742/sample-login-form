import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {
  Table,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Container,
  Form,
  Alert,
} from 'react-bootstrap';
import './DashboardContent.css';

const DashboardContent = ({cardData, labels, dataSet}) => {
  console.log(cardData);
  let chart = {
    labels: labels,
    datasets: [
      {
        label: 'DateVSSales',
        // backgroundColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(1,2,1,1',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dataSet,
      },
    ],
  };
  // let card = [
  //   {
  //     cardName: cardData[0].cardName1,
  //     value: cardData[0].cardValue1,
  //   },
  //   {
  //     cardName: cardData[1].cardName2,
  //     value: cardData[1].cardValue2,
  //   },
  //   {
  //     cardName: cardData[2].cardName3,
  //     value: cardData[2].cardValue3,
  //   },
  // ];
  return (
    <div className="dashboardContentParent">
      <div className="dashboardContent">
        {cardData.map((card, index) => (
          <Card className="card">
            <Card.Body>
              <Card.Text className="cardText name">{card.cardName}</Card.Text>
              <Card.Text className="cardText value">{card.cardValue}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div style={{width:"820px"}} >
        <Bar
          data={chart}
          width={100}
          height={40}
          options={{
            title: {
              display: true,
              text: 'Date/sales',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right',
            },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
