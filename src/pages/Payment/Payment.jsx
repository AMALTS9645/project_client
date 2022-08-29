import "./payment.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";

const Payment = () => {
  const amount = 499;

  const user = JSON.parse(localStorage.getItem("details"));
  // console.log(user);
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:8080/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:8080/api/payments/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Real Estate",
      description: "Transaction",
      image:
        "https://res.cloudinary.com/st-joseph-s-college-of-engineering-and-technology/image/upload/v1660123881/upload/logo1_copy_bxljd8.png",
      order_id: order.id,
      callback_url: "http://localhost:8080/api/payments/paymentverification",
      prefill: {
        name: user.firstName + user.lastName,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#1e00ff",
      },
    };
    // console.log(options)
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="payment">
      <div className="paymentWrapper">
        <div className="outer">
          <h1 className="headPay">Payment</h1>
          <hr />
          <div className="paySub">
            <h2 className="sub">For 30 days of Subscription</h2>
            <label className="subSmall">
              <h3>
                <FontAwesomeIcon icon={faIndianRupee} /> {amount} /-
              </h3>
            </label>
            <button onClick={() => checkoutHandler(amount)}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
