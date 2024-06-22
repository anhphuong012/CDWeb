import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserMenu from "../UserMenu/UserMenu";
import axios from "axios";
import "./OrderDetail.css";

export default function OrderDetail() {

    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const OrderDetailPage = ({ orders }) => {
        const { orderId } = useParams(); // Lấy orderId từ URL params
        const order = orders.find(order => order.id === parseInt(orderId)); // Tìm đơn hàng với id tương ứng

        if (!order) {
            return <div>Đơn hàng không tồn tại hoặc đã bị xóa.</div>;
        }
    }

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
                            <span className="icon-ic_back"> </span>CHI TIẾT ĐƠN HÀNG <b>{order.id}</b>
                        </h2>
                        <div className={`order__status order--${order.status === -1 ? 'cancel' : 'active'}`}>
                            {/* Hiển thị trạng thái đơn hàng */}
                            <span className="icon-ic_reload"></span>
                            <span>{order.status === -1 ? 'Đã hủy đơn hàng' : 'Đang giao hàng'}</span>
                        </div>
                    </div>
                    <div className="order-block row">
                        <div className="col-xl">
                            <div className="order-block__products checkout-my-cart">
                                <table className="cart__tables">
                                    <tbody>
                                        {order.orderItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="cart__product-item">
                                                        <div className="cart__product-item__img">
                                                            <a href={item.product.link}>
                                                                <img src={item.product.image} alt={item.product.name} />
                                                            </a>
                                                        </div>
                                                        <div className="cart__product-item__content">
                                                            <h3 className="cart__product-item__title">{item.product.name}</h3>
                                                            <div className="cart__product-item__properties">
                                                                <p>Size: <span>{item.size}</span></p>
                                                            </div>
                                                            <div className="cart__product-item__properties">
                                                                <p>Số lượng: <span>{item.quantity}</span></p>
                                                            </div>
                                                            <div className="cart__product-item__properties">
                                                                <p>SKU: <span>{item.product.sku}</span></p>
                                                            </div>
                                                            <div className="cart__product-item__price">{item.price.toLocaleString("vi-VN")} đ</div>
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
                                        <p><span className="price">{order.dateCreate}</span></p>
                                    </div>
                                    <div className="cart-summary__overview__item">
                                        <p>Tổng tiền</p>
                                        <p><b>{order.totalPrice.toLocaleString("vi-VN")} đ</b></p>
                                    </div>
                                </div>
                                <div className="cart-summary__payment">
                                    <h4>Hình thức thanh toán</h4>
                                    <div className="cart-summary__overview__item">
                                        <p>{order.typePayment}</p>
                                    </div>
                                </div>
                                <div className="cart-summary__delivery">
                                    <h4>Đơn vị vận chuyển</h4>
                                    <div className="cart-summary__overview__item">
                                        <p>{order.shippingMethod}</p>
                                    </div>
                                </div>
                                <div className="cart-summary__address">
                                    <h4>Địa chỉ</h4>
                                    <div className="cart-summary__overview__item">
                                        <p>{order.customerName}</p>
                                    </div>
                                    <div className="cart-summary__overview__item">
                                        <p>{order.address}</p>
                                    </div>
                                    <div className="cart-summary__overview__item">
                                        <p>Điện thoại: {order.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-buttons">
                        <a className="btn btn--large btn--outline" href={`https://ivymoda.com/customer/order_follow/${order.id}`}>Theo dõi đơn hàng</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
