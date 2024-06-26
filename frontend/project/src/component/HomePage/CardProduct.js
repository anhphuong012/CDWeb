import React from "react";
import "./card.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { buyProduct } from "../../actions/action";
import { connect } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export function Card(props) {
  const product = props.product;

  const type = props.type;
  const bg = props.bg;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (size) => {
    setAnchorEl(null);
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    } else {
      let cartProduct = {
        product: product,
        quanlity: 1,
        size: size,
      };
      // cartProduct.quanlity = 1;
      // cartProduct.size = size;

      try {
        const user = JSON.parse(sessionStorage.getItem("user"));

        // const header = {
        //   Authorization: sessionStorage.getItem("token").toString(),
        // };

        // console.log(header);
        // console.log("Token:" + sessionStorage.getItem("token"));
        // const response = await axios.post(
        //   `/api/cart/${user.id}?productId=${product.id}&quanlity=1&size=${size}`,
        //   {
        //     headers: {
        //       Authorization:
        //         "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsb2NhbGhvc3QzMDAwIiwic3ViIjoiYW5ocGh1b25nMUBnbWFpbC5jb20iLCJleHAiOjE3MTg5NzQ2OTcsImN1c3RvbUNsYWltIjoiQ3VzdG9tIiwiaWF0IjoxNzE4OTcxMDk3fQ.9bxaYRmm0Ow7IYvVW6YI-jcia9dvxB6MCLVZJvdME2yANUtLRxV4aVcTy4sik-gNbaLiz-lUEubLygTbDeFTpA",
        //     },
        //   }
        // );
        // console.log(response);
        // if (response.status == 200) {
        //   console.log("Size:" + size);
        //   console.log(cartProduct);
        //   props.buyProduct(cartProduct);
        //   toast.success("Thêm vào giỏ thành công!", {
        //     className: "Thông báo",
        //   });
        // } else {
        //   toast.error("xảy ra lỗi!", {
        //     className: "Thông báo",
        //   });
        // }

        await axios({
          method: "post",
          maxBodyLength: Infinity,
          url: `/api/cart/${user.id}?productId=${product.id}&quanlity=1&size=${size}`,

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage
              .getItem("token")
              .toString()}`,
          },
          mode: "cors",
          data: "",
        }).then(function (response) {
          if (response.status == 200) {
            console.log("Size:" + size);
            console.log(cartProduct);
            props.buyProduct(cartProduct);
            toast.success("Thêm vào giỏ thành công!", {
              className: "Thông báo",
            });
          } else {
            toast.error("xảy ra lỗi!", {
              className: "Thông báo",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCloseIcon = () => {
    setAnchorEl(null);
  };

  return (
    <div className="card">
      <div className="wrapper">
        <div className={product.name}></div>
        <div style={{ position: "absolute", top: "0", zIndex: "9" }}>
          {" "}
          <h4>
            <span class={`badge ${bg}`}>{type}</span>
          </h4>
        </div>
        <div
          className="card_img"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        <div className="heart">
          <svg xmlns="<http://www.w3.org/2000/svg>" viewBox="0 0 64 64">
            <path d="M47 5c-6.5 0-12.9 4.2-15 10-2.1-5.8-8.5-10-15-10A15 15 0 0 0 2 20c0 13 11 26 30 39 19-13 30-26 30-39A15 15 0 0 0 47 5z"></path>
          </svg>
        </div>
        <div className="cardInfo">
          <Link to={`/detail/${product.id}`} className="link">
            <span className="card-title">{product.name}</span>
          </Link>
          <div className="action">
            <div className="priceGroup">
              <p className="price newPrice">
                {product.price.toLocaleString("vi-VN")} VNĐ
              </p>
            </div>
            <div>
              {/* <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                classes={"btn-outline-light text-dark"}
                variant="outlined"
                size="small"
              >
                <i class="bi bi-bag-plus text-dark"></i>
              </Button> */}
              <IconButton
                color="secondary"
                aria-label="add to shopping cart"
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <AddShoppingCartIcon />
              </IconButton>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseIcon}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={() => handleClose("M")}>M</MenuItem>
                <MenuItem onClick={() => handleClose("L")}>L</MenuItem>
                <MenuItem onClick={() => handleClose("XL")}>XL</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);
