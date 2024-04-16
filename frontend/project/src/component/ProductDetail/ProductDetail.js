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
import "./detail.css";
import { Button } from "react-bootstrap";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
export default function ProductDetail() {
  const [selectSize, setSelectSize] = useState(null);

  console.log("Select size:" + selectSize);

  const handchangeBtn = (option) => {
    setSelectSize(option);
  };
  return (
    <div>
      <Header></Header>
      <section style={{ marginTop: "7rem", marginBottom: "7rem" }}>
        <div
          role="presentation"
          onClick={handleClick}
          className="container m-4"
        >
          <Breadcrumbs aria-label="breadcrumb" sx={{ ml: 10 }}>
            <Link className="bread" to="/">
              Trang chủ
            </Link>

            <Typography color="text.primary">Chi tiết</Typography>
          </Breadcrumbs>
        </div>
        <div className="container  main-detail">
          <div className="col-md-6">
            <img
              className="img-left"
              src="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/467a20e0d092334cb796d81c30881d75.JPG"
            ></img>
          </div>
          <div className="col-md-6 wrap-infor">
            <h1 className="infor">
              LOZENGE SET - BỘ HỌA TIẾT ÁO SƠ MI VÀ QUẦN SHORT
            </h1>
            <div className="sub-infor">
              <p>
                <span>SKU: 17B9780</span>
              </p>
              <div className="rating">
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                    size="small"
                    classes="icon-rate"
                  />
                </Stack>
                <span className="num-rate">(0 đánh giá)</span>
              </div>
            </div>
            <div className="detail-price">Giá: 2.180.000đ</div>
            <div className="detail-size">
              <span>Chọn size:</span>
            </div>
            <div className="detai_size_input mt-3 mb-3">
              <button
                className={`btn-size ${selectSize == "M" ? "click" : ""}`}
                onClick={() => handchangeBtn("M")}
              >
                M
              </button>

              <button
                className={`btn-size ${selectSize == "L" ? "click" : ""}`}
                onClick={() => handchangeBtn("L")}
              >
                L
              </button>

              <button
                className={`btn-size ${selectSize == "XL" ? "click" : ""}`}
                onClick={() => handchangeBtn("XL")}
              >
                XL
              </button>

              <button
                className={`btn-size ${selectSize == "XXL" ? "click" : ""}`}
                onClick={() => handchangeBtn("XXL")}
              >
                XXL
              </button>
            </div>

            <div className="quanlity mt-5 mb-3">
              <span>Số lượng:</span>
              <div className="ml" style={{ position: "relative" }}>
                <input className="input-quanlity" type="number" />

                <button className="btn-quanlity">-</button>
                <button className="btn-quanlity" style={{ right: 0 }}>
                  +
                </button>
              </div>
            </div>

            <div className="main-btn mt-5">
              <button
                type="button"
                className={"btn btn-outline-light text-dark btn-shop"}
              >
                Thêm vào giỏ hàng
              </button>

              <button
                type="button"
                className={"btn btn-outline-light text-dark btn-shop ml"}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
