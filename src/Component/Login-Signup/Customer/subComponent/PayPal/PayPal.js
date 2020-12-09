import axios from 'axios';
import React, {useRef} from 'react';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function PayPal({
  finalAmount,
  setOrderDateAndPaymentMethod,
  orderDateAndPaymentMethod,
  cartDetailsCpy,
  setAccountVsOrder,
}) {
  const history = useHistory();
  const payPalRef = useRef();

  console.log(finalAmount);

  useEffect(() => {
    console.log(payPalRef.current);
    const customerName = localStorage.getItem('customerName');

    const loadPaypal = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.head.appendChild(script);
      });
    };

    const displayPaypal = async () => {
      const src =
        'https://www.paypal.com/sdk/js?client-id=AbgHyxTI-BMsBqoxbvfFjiE68iD0xby1DhQVPXgQMC1jultABjgO1XevAqTMGR6_mE-Um2OYyM2Z0jad&currency=USD';
      const isLoad = await loadPaypal(src);
      console.log(isLoad);
      if (isLoad) {
        setTimeout(() => {
          window.paypal
            .Buttons({
              // Set up the transaction
              createOrder: function (data, actions, err) {
                return actions.order.create({
                  purchase_units: [
                    {
                      discription: 'Thank you for using Paypal',
                      amount: {
                        currency_code: 'USD',
                        value: (finalAmount * 0.013).toFixed(0),
                      },
                    },
                  ],
                });
              },

              // Finalize the transaction
              onApprove: async function (data, actions) {
                return actions.order.capture().then(function (transaction) {
                  // Show a success message to the buyer
                  console.log(transaction);
                  if (transaction.status === 'COMPLETED') {
                    console.log('transaction complete');
                    let transactionDetails = {
                      orderId: transaction.id,
                      status: 'pending',
                    };

                    setOrderDateAndPaymentMethod({
                      ...orderDateAndPaymentMethod,
                      orderId: transaction.id,
                      status: 'pending',
                    });

                    axios
                      .post('http://3.137.34.100:3001/placeOrder', {
                        orderDetails: cartDetailsCpy,
                        orderDateAndPaymentMethod: orderDateAndPaymentMethod,
                        transactionDetails: transactionDetails,
                      })
                      .then(function (responce) {
                        console.log(responce.data);
                        if (responce.data.status === 200) {
                          axios
                            .delete('http://3.137.34.100:3001/viewcartRemoveAll', {
                              params: {
                                customerName: customerName,
                              },
                            })
                            .then(function (responce) {
                              console.log(responce.data);
                              if (responce.data.status === 200) {
                                setAccountVsOrder(false)
                                history.push('/accountInfo');
                              } else {
                              }
                            });
                        } else {
                        }
                      });
                  } else {
                  }
                  // alert(
                  //   "Transaction completed by " +
                  //     details.payer.name.given_name +
                  //     "!"
                  // );
                });
              },
              // Paypment failed
              onError: (err) => {
                console.log(err);
              },
            })
            .render(payPalRef.current);
        }, 100);
      } else {
        console.log('paypal load error');
      }
    };
    displayPaypal();
  }, []);
  return <div ref={payPalRef} id="paypal-button-container"></div>;
}

export default PayPal;
