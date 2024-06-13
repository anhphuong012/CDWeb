import React, { useEffect, useState } from "react";
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

import { useParams, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { buyProduct } from "../../actions/action";
import { connect } from "react-redux";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
export function ProductDetail(props) {
  const [selectSize, setSelectSize] = useState(null);
  const [item, setItem] = useState(null);
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState(1);

  console.log("Select size:" + selectSize);

  const params = useParams();
  const navigate = useNavigate();

  const keyword = params.id;
  console.log("key:" + keyword);

  const handchangeBtn = (option) => {
    setSelectSize(option);
  };

  const fetchData = async (keyword) => {
    const response = await axios.get(`/api/products/product/${keyword}`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setItem(response.data.data);
      }
    }
  };
  useEffect(() => {
    fetchData(keyword);
  }, []);

  console.log("Item:" + item);

  const handleCart = async (product) => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    } else {
      if (selectSize != null) {
        // let cartProduct = product;
        // cartProduct.quanlity = 1;
        // cartProduct.size = selectSize;
        // props.buyProduct(cartProduct);

        let cartProduct = {
          product: product,
          quanlity: 1,
          size: selectSize,
        };
        // cartProduct.quanlity = 1;
        // cartProduct.size = size;

        try {
          const user = JSON.parse(sessionStorage.getItem("user"));
          const response = await axios.post(
            `/api/cart/${user.id}?productId=${product.id}&quanlity=1&size=${selectSize}`
          );
          console.log(response);
          if (response.status == 200) {
            console.log("Size:" + selectSize);
            console.log(cartProduct);
            props.buyProduct(cartProduct);
            setSelectSize(null);
            toast.success("Đã thêm vào giỏ hàng!");
          } else {
            toast.error("xảy ra lỗi!", {
              className: "Thông báo",
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error("Vui lòng chọn size!");
      }
    }
  };
  return (
    <div>
      <Header product={product}></Header>
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
        {item != null && (
          <div className="container  main-detail">
            <div className="col-md-6">
              <img className="img-left" src={item.image}></img>
            </div>
            <div className="col-md-6 wrap-infor">
              <h1 className="infor">{item.name}</h1>
              <div className="sub-infor">
                <p>
                  <span>SKU: SP{item.id}</span>
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
              <div className="detail-price">
                Giá: {item.price.toLocaleString("vi-VN")} VNĐ
              </div>
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
                  <input
                    className="input-quanlity"
                    type="number"
                    value={value}
                  />

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
                  onClick={() => handleCart(item)}
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
              <ToastContainer position="bottom-right" />
              <div className="infor-product">
                <h5>Giới thiệu</h5>
                <p>{item.descreption}</p>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer></Footer>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    buyProduct: (product_current) => dispatch(buyProduct(product_current)),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartAr,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
