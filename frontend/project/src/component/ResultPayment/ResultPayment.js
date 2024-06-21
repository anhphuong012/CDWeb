import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { clearCart } from "../../actions/action";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
function Payment(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const [amountState, setAmountState] = useState("");
  const [orderState, setOrderState] = useState("");
  const [vnpayIdSate, setVnpayIdSate] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  //   const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get("vnp_Amount");
    const orderId = queryParams.get("vnp_TxnRef");
    const vnpayId = queryParams.get("vnp_TransactionNo");
    const responseCode = queryParams.get("vnp_ResponseCode");

    console.log(amount + "-" + orderId + "-" + vnpayId + "-" + responseCode);
    console.log(responseCode != "00");
    setAmountState(amount);
    setOrderState(orderId);
    setVnpayIdSate(vnpayId);

    if (responseCode == "00") {
      const callApi = async () => {
        try {
          const user = JSON.parse(sessionStorage.getItem("user"));
          // const response = await axios.post(
          //   `/api/order/${user.id}?orderId=${orderId}&idVnpay=${vnpayId}`
          // );
          // if (response.status == 200) {
          //   sessionStorage.setItem("cart", []);
          //   clearCart();
          //   setIsDelete(!isDelete);
          //   const timer = setInterval(() => {
          //     setCountdown((prevCountdown) => {
          //       if (prevCountdown === 1) {
          //         clearInterval(timer);
          //         document.location.href = "/order/history";
          //         return;
          //       }
          //       return prevCountdown - 1;
          //     });
          //   }, 1000);
          //   document.location.href = "/order/history";
          // }
          await axios({
            method: "post",
            maxBodyLength: Infinity,
            url: `/api/order/${user.id}?orderId=${orderId}&idVnpay=${vnpayId}`,

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage
                .getItem("token")
                .toString()}`,
            },
            mode: "cors",
            data: "",
          }).then(function (response) {
            if (response.status == 200) {
              sessionStorage.setItem("cart", []);
              clearCart();
              setIsDelete(!isDelete);

              document.location.href = "/order/history";
            }
          });
        } catch (error) {
          // setError(error.message);
          console.log(error);
        }
      };

      callApi();
    } else if (responseCode == 24) {
      navigate("/order");
    } else {
      setError("Missing parameters");
      return;
    }
  }, [location, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log();
  return (
    <div>
      <Header></Header>
      <div style={{ marginTop: "7rem", marginBottom: "7rem" }}>
        {" "}
        Đã thanh toán đơn hàng {orderState} với mã giao dịch {vnpayIdSate} với
        số tiền {(parseInt(amountState) / 100).toLocaleString("vi-VN")} VNĐ{" "}
      </div>
      <div>Sẽ trở về trang đơn hàng sau {countdown}</div>
      <Footer></Footer>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartAr,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => {
      dispatch(clearCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
