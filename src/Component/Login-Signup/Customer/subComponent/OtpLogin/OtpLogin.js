const {default: axios} = require('axios');
var FormData = require('form-data');

module.exports = {
  otpVerificationHandler: () => {
    var data = new FormData();
    console.log('Otp verify function');
    // var config = {
    //   method: 'post',
    //   url:
    //     'https://cors-anywhere.herokuapp.com/https://rest-api.d7networks.com/secure/send',
    //   headers: {
    //     Authorization: 'Token 3ca5c060790316f064acd25d443f4848d985fb0d',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   data: {
    //     to: '9995575570',
    //     content:
    //       'Welcome to D7 sms , we will help you to talk with your customer effectively',
    //     from: 'SMSINFO',
    //     dlr: 'yes',
    //     'dlr-method': 'GET',
    //     'dlr-level': '2',
    //     'dlr-url': 'http://yourcustompostbackurl.com',
    //   },
    // };
    axios
      .post(
        'https://cors-anywhere.herokuapp.com/https://rest-api.d7networks.com/secure/send',
        {
          headers: {
            Authorization: 'Token 3ca5c060790316f064acd25d443f4848d985fb0d',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: {
            to: '9995575570',
            content:
              'Welcome to D7 sms , we will help you to talk with your customer effectively',
            from: 'SMSINFO',
            dlr: 'yes',
            'dlr-method': 'GET',
            'dlr-level': '2',
            'dlr-url': 'http://yourcustompostbackurl.com',
          },
        }
      )
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
