import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserMenu from "../UserMenu/UserMenu";
import axios from "axios";
import "./OrderDetail.css";

export default function OrderDetail() {
  const [orderI, setOrderI] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    } else {
      var user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user);
      fetchOrder(id);
      fetchData(user.id);
    }
  }, [id]);
  const fetchOrder = async (id) => {
    let all = "/api/order/orders/${id}";

    const response = await axios.get(all);

    if (response.status == 200) {
      if (response.data.data != null) {
        setOrderI(response.data.data);
        console.log(response.data.data);
      }
    }
  };

  const fetchData = async (userId, status) => {
    let all = "/api/order/${userId}";

    const response = await axios.get(all);

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        console.log(response.data.data);
      }
    }
  };

  console.log(id);
  console.log(orderI);

  const convertDate = (dateStr) => {
    const dateAndTime = dateStr.split("T");
    const Time = dateAndTime[1];
    const date = dateAndTime[0].split("-");
    return Time + " " + date[2] + "-" + date[1] + "-" + date[0];
  };

  return (
    <div>
      <Header />
      <div className="container_customer">
        <div className="col-lg-4 col-xl-auto">
          <UserMenu />
        </div>
        <div className="col-lg col-account-content">
          <div className="order-block__title">
            <h2>
              <span className="icon-ic_back"> </span>CHI TIẾT ĐƠN HÀNG{" "}
              <b>{id}</b>
            </h2>
            <div className="order__status order--cancel">
              {/* Hiển thị trạng thái đơn hàng */}
              <span className="icon-ic_reload"></span>
              <span>{"Đang giao hàng"}</span>
            </div>
          </div>
          <div className="order-block row">
            <div className="col-xl">
              <div className="order-block__products checkout-my-cart">
                <table className="cart__tables">
                  <tbody>
                    {orderI != null &&
                      orderI.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="cart__product-item">
                              <div className="cart__product-item__img">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                ></img>
                              </div>
                              <div className="cart__product-item__content">
                                <h3 className="cart__product-item__title">
                                  {item.product.name}
                                </h3>
                                <div className="cart__product-item__properties">
                                  <p>
                                    Size: <span>{item.sizes.size}</span>
                                  </p>
                                </div>
                                <div className="cart__product-item__properties">
                                  <p>
                                    Số lượng: <span>{item.sizes.quantity}</span>
                                  </p>
                                </div>
                                <div className="cart__product-item__properties">
                                  <p>
                                    SKU: <span>{item.product.sku}</span>
                                  </p>
                                </div>
                                <div className="cart__product-item__price">
                                  {item.price.toLocaleString("vi-VN")} đ
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-xl-1"></div>
            <div className="col-xl-4">
              <div className="cart-summary">
                <div className="cart-summary__overview">
                  <h3>Tóm tắt đơn hàng</h3>
                  <div className="cart-summary__overview__item">
                    <p>Ngày tạo đơn</p>
                    <p>
                      <span className="price">
                        {convertDate(data.dateCreate + " ")}
                      </span>
                    </p>
                  </div>
                  <div className="cart-summary__overview__item">
                    <p>Tổng tiền</p>
                    <p>
                      <b>{data.totalPrice.toLocaleString("vi-VN")} đ</b>
                    </p>
                  </div>
                </div>
                <div className="cart-summary__payment">
                  <h4>Hình thức thanh toán</h4>
                  <div className="cart-summary__overview__item">
                    <p>{data.typePayment}</p>
                  </div>
                </div>
                {/* <div className="cart-summary__address">
                                    <h4>Địa chỉ</h4>
                                    <div className="cart-summary__overview__item">
                                        <p>{order.address}</p>
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
          <div className="order-buttons">
            <a
              className="btn btn--large btn--outline"
              href={`https://ivymoda.com/customer/order_follow/${orderI.id}`}
            >
              Theo dõi đơn hàng
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
