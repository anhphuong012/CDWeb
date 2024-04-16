import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import logoshop from "../image/logo.png";
import "../Footer/footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container p-5">
        <div className="row">
          <div className="col-6 row">
            <div className="col-6" style={{ textAlign: "justify" }}>
              <img src={logoshop} className="icon-shop" />
              <div>
                <p className="descreption">
                  Công ty Cổ phần Dự Kim với số đăng ký kinh doanh: 0105777650
                </p>
                <p className="descreption">
                  <strong>Địa chỉ đăng ký:</strong> Tổ dân phố Tháp, P.Đại Mỗ,
                  Q.Nam Từ Liêm, TP.Hà Nội, Việt Nam
                </p>
                <p className="descreption">
                  <strong>Số điện thoại:</strong> 0243 205 2222/ 090 589 8683
                </p>
                <p className="descreption">
                  <strong>Email:</strong> cskh@ivy.com.vn
                </p>
                <div style={{ marginTop: "5px" }}>
                  <a href="" style={{ marginRight: "10px" }}>
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a className="mr-l-r-10" href="" style={{ color: "#E1306C" }}>
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a className="mr-l-r-10" href="" style={{ color: "red" }}>
                    <i class="bi bi-google"></i>
                  </a>
                  <a className="mr-l-r-10" href="" style={{ color: "red" }}>
                    <i class="bi bi-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 ">
              <h3
                className="title"
                style={{ textAlign: "justify", marginLeft: "10%" }}
              >
                Giới thiệu
              </h3>
              <div>
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Về IVY moda
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Tuyển dụng
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Hệ thống cửa hàng
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-6 row">
            <div className="col-6 ">
              <h3
                className="title"
                style={{ textAlign: "justify", marginLeft: "10%" }}
              >
                Dịch vụ khách hàng
              </h3>
              <div>
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Chính sách điều khoản
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Hướng dẫn mua hàng
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Chính sách thanh toán
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Chính sách đổi trả
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Chính sách bảo hành
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-6 ">
              <h3
                className="title"
                style={{ textAlign: "justify", marginLeft: "10%" }}
              >
                Liên hệ
              </h3>
              <div>
                <ul style={{ textAlign: "justify" }}>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      Hotline
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Email
                    </a>
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    <a
                      href=""
                      className="descreption"
                      style={{ textDecoration: "none", marginBottom: "20px" }}
                    >
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
