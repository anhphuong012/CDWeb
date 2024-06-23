import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserMenu from "../UserMenu/UserMenu";
import axios from "axios";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ChangePass.css"
import { CgPassword } from "react-icons/cg";

export default function CustomerInfo() {
    // const [userID, setUserID] = useState(null);
    // const [user, setUser] = useState("");

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        return <div>Loading...</div>;
    }

    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (rePassword !== cPassword) {
            setMessage("mật khẩu xác nhận không đúng");
            return;
        }
        try {

            const token = sessionStorage.getItem('token');
            const userId = JSON.parse(sessionStorage.getItem('user')).id;

            const response = await axios.post(
                `http://192.168.1.146:8081/api/user/changePass/${userId}`,
                {
                    password: password,
                    rePassword: rePassword
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setMessage(response.data.message);
            setPassword('');
            setRePassword('');
            setCPassword('');
        } catch (error) {
            setMessage('Có lỗi xảy ra khi thay đổi mật khẩu.');
        }
    };

    return (
        <div>
            <Header></Header>
            <div className="container_customer">
                <div className="col-lg-4 col-xl-auto">
                    <UserMenu></UserMenu>
                </div>
                <div class="col-lg-8 col-xl">
                    <div class="order-block__title">
                        <h2>Mật khẩu</h2>
                    </div>
                    <div class="order-block my-account-wrapper row">
                        <div class="col-md-7">
                            <form enctype="application/x-www-form-urlencoded" name="frm_register" method="post" action="">
                                <div class="row form-group">
                                    <div class="col col-label">
                                        <label>Mật khẩu hiện tại</label>
                                    </div>
                                    <div class="col col-input">
                                        <input class="form-control" value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            required></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-label">
                                        <label>Mật khẩu mới</label>
                                    </div>
                                    <div class="col col-input has-button">
                                        <input value={rePassword} class="form-control"
                                            onChange={(e) => setRePassword(e.target.value)}
                                            type="password" id=""
                                            required></input>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-label">
                                        <label>Xác nhận mật khẩu mới</label>
                                    </div>
                                    <div class="col col-input has-button">
                                        <input class="form-control" type="password" value={cPassword}
                                            onChange={(e) => setCPassword(e.target.value)}
                                            id="" name=""
                                            required></input>
                                    </div>
                                </div>
                                <div class="row form-radio-checkbox form-group">
                                    <div class="col col-label"></div>
                                    <div class="col-12 col-input form-buttons">
                                        <button className="btn btn-outline-light text-dark btn-shop" onClick={handleChangePassword}>Cập nhật</button>
                                        <button className="btn btn-outline-light text-dark btn-shop" onClick={() => {
                                            navigate("/customer/info");
                                        }}>Trở về</button>
                                    </div>
                                </div>
                            </form>
                            {message && <p>{message}</p>}
                        </div>

                    </div>
                </div>
            </div >
            <Footer></Footer>
        </div >

    );
}