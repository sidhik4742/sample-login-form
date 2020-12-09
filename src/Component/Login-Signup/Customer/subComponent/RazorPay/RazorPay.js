const razorpay = require("razorpay");

const __DEV__ = document.domain === "localhost";

module.exports = {
  razorPayOnLoad: (src) => {
    //"https://checkout.razorpay.com/v1/checkout.js"

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  },
  displayRazorPay: async ({ imageSrc, amount, orderId, name }, callback) => {
    // console.log(imageSrc, amount, orderId, name);
    const src = await module.exports.razorPayOnLoad(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!src) {
      console.log("razor pauy script loading error");
      return;
    } else {
      var options = {
        key: __DEV__ ? "rzp_test_V0MWwRPEea6s2z" : "__PRODUCTION__", // Enter the Key ID generated from the Dashboard
        amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: imageSrc,
        handler: function (response) {
          console.log(response);
          return callback({
            orderId: response.razorpay_payment_id,
            status: "success",
          });
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: name,
          //   email: "sidhik1994@gmail.com",
          //   contact: "7012019041",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var paymentObj = new window.Razorpay(options);
      paymentObj.open();
    }
  },
};
