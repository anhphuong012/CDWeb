import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserMenu from "../UserMenu/UserMenu";
import axios from "axios";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerInfo.css"

export default function CustomerInfo() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const userSession = sessionStorage.getItem("user");
        if (userSession) {
            setUser(JSON.parse(userSession));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header></Header>
            <div className="container_customer">
                <div className="col-lg-4 col-xl-auto">
                    <UserMenu></UserMenu>
                </div>
                <div class="col-lg-8 col-xl">
                    <div class="order-block__title">
                        <h2>TÀI KHOẢN CỦA TÔI</h2>
                    </div>
                    <div class="order-block my-account-wrapper row">
                        <p class="alert alert-primary">"Vì chính sách an toàn thẻ, bạn không thể thay đổi SĐT, Ngày sinh, Họ tên. Vui lòng liên hệ CSKH 0905898683 để được hỗ trợ"</p>
                        <div class="col-md-7">
                            <form enctype="application/x-www-form-urlencoded" name="frm_register" method="post" action="">
                                <div class="row form-group">
                                    <div class="col col-label">
                                        <label>Họ và tên</label>
                                    </div>
                                    <div class="col col-input">
                                        <input class="form-control" value={user.username} type="text" disabled="disabled"></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-label">
                                        <label>Số điện thoại</label>
                                    </div>
                                    <div class="col col-input has-button">
                                        <input value={user.phone} class="form-control" type="text" id="customer_phone" disabled="disabled"></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-label">
                                        <label>Email</label>
                                    </div>
                                    <div class="col col-input has-button">
                                        <input class="form-control" type="text" value={user.email} id="customer_email" name="customer_email" disabled="disabled"></input>
                                    </div>
                                </div>
                                <div class="row form-radio-checkbox form-group">
                                    <div class="col col-label"></div>
                                    <div class="col-12 col-input form-buttons">
                                        <button class="btn btn--large">Cập nhật</button>
                                        <button
                                            className="btn btn--large btn--outline"
                                            onClick={() => {
                                                navigate('/customer/password');
                                            }}
                                        >Đổi mật khẩu</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>

    );
}