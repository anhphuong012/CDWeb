import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "D:/web/CDWeb/frontend/project/src/component/Register/register.css";
import { Button } from "react-bootstrap";

export default function Register() {
    return (
        <div>
            <Header></Header>
            <section style={{ marginTop: "7rem", marginBottom: "7rem" }}>
                <div class="containerRegis">
                    <div class="order-block__title justify-content-center pt-4 pb-2"><h3 class="text-uppercase">Đăng ký</h3></div>
                    <div class="authRegis auth-forgotpass">
                        <div class="rowRegis"  >

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="register-summary__overview">
                                    <h4>Thông tin khách hàng</h4>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Họ:<span style={{ color: "red" }}>*</span></label>
                                            <input type="text" class="form-control" value="" name="customer_firstname" placeholder="Họ..." style={{ width: "100%" }}></input>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Tên:<span style={{ color: "red" }}>*</span></label>
                                            <input class="form-control" type="text" value="" name="customer_display_name" placeholder="Tên..." style={{ width: "100%" }}></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Email:<span style={{ color: "red" }}>*</span></label>
                                            <input id="email" class="form-control" type="email" name="customer_email" value="" placeholder="Email..." style={{ width: "100%" }}></input>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Điện thoại:<span style={{ color: "red" }}>*</span></label>
                                            <input class="form-control" type="text" value="" name="customer_phone" placeholder="Điện thoại..." style={{ width: "100%" }}></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Ngày sinh:<span style={{ color: "red" }}>*</span></label>
                                            <input type="text" class="form-control datepicker hasDatepicker" name="customer_birthday" value="" placeholder="Ngày sinh..." style={{ width: "100%" }} id="dp1714665842295"></input>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Giới tính:<span style={{ color: "red" }}>*</span></label>
                                            <select name="customer_sex" style={{ width: "100%" }} class="form-control">
                                                <option value="0">Nữ</option>
                                                <option value="1">Nam</option>
                                                <option value="2">Khác</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Tỉnh/TP:<span style={{ color: "red" }}>*</span></label>
                                            <select class="form-control" name="register_region_id" id="register_region_id" style={{ width: "100%" }}>
                                                <option value="-1">Chọn Tỉnh/Tp</option>
                                                <option value="511">Hà Nội</option>
                                                <option value="507">Hồ Chí Minh</option>
                                                <option value="512">Hải Phòng</option>
                                                <option value="499">Đà Nẵng</option>
                                                <option value="485">An Giang</option>
                                                <option value="486">Bình Dương</option>
                                                <option value="487">Bắc Giang</option>
                                                <option value="488">Bình Định</option>
                                                <option value="490">Bạc Liêu</option>
                                                <option value="491">Bắc Ninh</option>
                                                <option value="492">Bình Phước</option>
                                                <option value="494">Bình Thuận</option>
                                                <option value="495">Bến Tre</option>
                                                <option value="496">Cao Bằng</option>
                                                <option value="497">Cà Mau</option>
                                                <option value="498">Cần Thơ</option>
                                                <option value="500">Điện Biên</option>
                                                <option value="502">Đồng Nai</option>
                                                <option value="504">Đồng Tháp</option>
                                                <option value="505">Gia Lai</option>
                                                <option value="506">Hòa Bình</option>
                                                <option value="508">Hải Dương</option>
                                                <option value="509">Hà Giang</option>
                                                <option value="510">Hà Nam</option>
                                                <option value="513">Hà Tĩnh</option>
                                                <option value="514">Hậu Giang</option>
                                                <option value="515">Hưng Yên</option>
                                                <option value="516">Kiên Giang</option>
                                                <option value="517">Khánh Hòa</option>
                                                <option value="518">Kon Tum</option>
                                                <option value="519">Long An</option>
                                                <option value="520">Lâm Đồng</option>
                                                <option value="521">Lai Châu</option>
                                                <option value="522">Lào Cai</option>
                                                <option value="523">Lạng Sơn</option>
                                                <option value="524">Nghệ An</option>
                                                <option value="525">Ninh Bình</option>
                                                <option value="526">Nam Định</option>
                                                <option value="527">Ninh Thuận</option>
                                                <option value="528">Phú Thọ</option>
                                                <option value="529">Phú Yên</option>
                                                <option value="530">Quảng Bình</option>
                                                <option value="531">Quảng Ngãi</option>
                                                <option value="532">Quảng Nam</option>
                                                <option value="533">Quảng Ninh</option>
                                                <option value="534">Quảng Trị</option>
                                                <option value="535">Sơn La</option>
                                                <option value="536">Sóc Trăng</option>
                                                <option value="537">Thái Bình</option>
                                                <option value="538">Tiền Giang</option>
                                                <option value="539">Thanh Hóa</option>
                                                <option value="540">Tây Ninh</option>
                                                <option value="541">Tuyên Quang</option>
                                                <option value="543">Trà Vinh</option>
                                                <option value="544">Thái Nguyên</option>
                                                <option value="545">Vĩnh Long</option>
                                                <option value="546">Vĩnh Phúc</option>
                                                <option value="547">Yên Bái</option>
                                                <option value="548">Đắk Nông</option>
                                                <option value="549">Bắc Kạn</option>
                                                <option value="550">Thừa Thiên - Huế</option>
                                                <option value="551">Đắk Lắk</option>
                                                <option value="552">Bà Rịa - Vũng Tàu</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-group">
                                            <label>Quận/Huyện:<span style={{ color: "red" }}>*</span></label>
                                            <select name="register_city_id" id="register_city_id" style={{ width: "100%" }} class="form-control">
                                                <option value="-1">Chọn Quận/Huyện</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group">
                                            <label>Phường/Xã:<span style={{ color: "red" }}>*</span></label>
                                            <select name="vnward_id" id="vnward_id" style={{ width: "100%" }} class="form-control">
                                                <option value="-1">Chọn Phường/Xã</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group">
                                            <label>Địa chỉ:<span style={{ color: "red" }}>*</span></label>
                                            <textarea class="form-control" name="address"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <div class="register-summary__overview">
                                    <h4>Thông tin mật khẩu</h4>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group">
                                            <label>Mật khẩu:<span style={{ color: "red" }}>*</span></label>
                                            <input class="form-control" type="password" value="" name="customer_pass1" placeholder="Mật khẩu..."></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group">
                                            <label>Nhập lại mật khẩu:<span style={{ color: "red" }}>*</span></label>
                                            <input class="form-control" type="password" value="" name="customer_pass2" placeholder="Nhập lại mật khẩu..."></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-group">
                                            <label>Mời nhập các ký tự trong hình vào ô sau:<span style={{ color: "red" }}>*</span></label>
                                            <input class="form-control" type="text" name="captcha"></input>
                                        </div>
                                        <p class="img_capcha"><img src="https://ivymoda.com/ajax/captcha" border="0" class="img-responsive"></img></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-check">
                                            <input class="form-check-input checkboxs" type="checkbox" name="customer_agree" value="1" id="defaultCheck1"></input>
                                            <label style={{ marginTop: "4px", marginLeft: "3px" }} class="form-check-label" for="defaultCheck1">
                                                <span> Đồng ý với các <a style={{ color: "#f31f1f" }} href="https://ivymoda.com/about/chinh-sach-bao-hanh">điều khoản</a> của IVY </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="form-check">
                                            <input class=" form-check-input checkboxs" type="checkbox" value="1" name="customer_subscribe" id="defaultCheck2"></input>
                                            <label style={{ marginTop: "4px", marginLeft: "3px" }} class="form-check-label" for="defaultCheck2">
                                                <span>Đăng ký nhận bản tin</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <button id="bnt_register" class="btn btn--large" type="submit" style={{ width: "100%", marginTop: "15px" }}>Đăng ký</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            <Footer></Footer>
        </div>
    );
}