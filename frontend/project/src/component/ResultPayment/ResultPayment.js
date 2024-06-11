import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const [amountState, setAmountState] = useState("");
  const [orderState, setOrderState] = useState("");
  const [vnpayIdSate, setVnpayIdSate] = useState("");

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

    if (responseCode != "00") {
      setError("Missing parameters");
      return;
    }

    const callApi = async () => {
      //   try {
      //     const response = await fetch(
      //       `/api/some-endpoint?param1=${orderId}&param2=${vnpayId}`
      //     );
      //     if (!response.ok) {
      //       throw new Error("API call failed");
      //     }
      // const data = await response.json();
      // Xử lý dữ liệu từ API nếu cần thiết

      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            //   navigate("/new-route");
            return;
          }
          return prevCountdown - 1;
        });
      }, 1000);
      //   }
      //   catch (error) {
      //     setError(error.message);
      //   }
    };

    callApi();
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
        số tiền {amountState}{" "}
      </div>
      <div>Sẽ trở về trang đơn hàng sau {countdown}</div>
      <Footer></Footer>
    </div>
  );
}
