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
import "../login/login.css";
import { Button } from "react-bootstrap";

export default function Login() {
  return (
    <div>
      <Header></Header>
      <section style={{ marginTop: "7rem", marginBottom: "7rem" }}>
        <div class="container">
          <div class="auth">
            <div class="auth__login">
              <h3 class="auth__title">Bạn đã có tài khoản IVY</h3>
              <div class="auth__login__content">
                <p class="auth__description">
                  Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành
                  viên và nhận được những ưu đãi tốt hơn!
                </p>
                <form
                  id="login-form"
                  class="auth__form login-form"
                  role="login"
                  name="frm_customer_account_email"
                  enctype="application/x-www-form-urlencoded"
                  method="post"
                  action=""
                  autocomplete="off"
                >
                  <div class="form-group">
                    <input
                      class="form-control"
                      name="customer_account"
                      type="text"
                      placeholder="Email/SĐT"
                      value=""
                    ></input>
                  </div>
                  <div class="form-group">
                    <input
                      class="form-control"
                      name="customer_password"
                      type="password"
                      placeholder="Mật khẩu"
                    ></input>
                  </div>
                  <div class="auth__form__options">
                    <div class="form-checkbox">
                      <label>
                        <input
                          class="checkboxs"
                          value="1"
                          name="customer_remember"
                          type="checkbox"
                        ></input>
                        <span> Ghi nhớ đăng nhập</span>
                      </label>
                    </div>
                    <a
                      class="auth__form__link"
                      href="https://ivymoda.com/customer/forgotpass"
                    >
                      Quên mật khẩu?{" "}
                    </a>
                  </div>
                  <div class="auth__form__options">
                    <a
                      class="auth__form__link login-with-qr"
                      href="javascript:void(0)"
                    >
                      Đăng nhập bằng mã QR
                    </a>
                    <a
                      class="auth__form__link"
                      href="https://ivymoda.com/customer/login_with_otp"
                    >
                      Đăng nhập bằng OTP
                    </a>
                  </div>
                  <div class="auth__form__buttons">
                    <div>
                      <div
                        class="grecaptcha-badge">
                      </div>
                    </div>
                    <button
                      id="but_login_email"
                      name="but_login_email"
                      class="btn btn--large g-recaptcha"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="auth__register">
              <h3 class="auth__title">Khách hàng mới của IVY moda</h3>
              <div class="auth__login__content">
                <p class="auth__description">
                  Nếu bạn chưa có tài khoản trên ivymoda.com, hãy sử dụng tùy
                  chọn này để truy cập biểu mẫu đăng ký.
                </p>
                <p class="auth__description">
                  Bằng cách cung cấp cho IVY moda thông tin chi tiết của bạn,
                  quá trình mua hàng trên ivymoda.com sẽ là một trải nghiệm thú
                  vị và nhanh chóng hơn!
                </p>

                <div class="auth__form__buttons">
                  <a href="">
                    {" "}
                    <button class="btn btn--large">Đăng ký</button>
                  </a>
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
