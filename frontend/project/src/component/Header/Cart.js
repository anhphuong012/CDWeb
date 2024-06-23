import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";
import "./header.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CloseIcon from "@mui/icons-material/Close";
import { connect } from "react-redux";
import {
  deleteProduct,
  increaProduct,
  decreaProduct,
} from "../../actions/action";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Cart(props) {
  const [open, setOpen] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const navigate = useNavigate();

  console.log("Cart: " + props.cart.length);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const deleteSate = async (product) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      // const response = await axios.delete(
      //   `/api/cart/${user.id}?productId=${product.product.id}&quanlity=1&size=${product.size}`
      // );

      // if (response.status == 200) {
      //   props.deleteProduct(product);
      //   setIsDelete(!isDelete);
      // }

      await axios({
        method: "delete",
        maxBodyLength: Infinity,
        url: `/api/cart/${user.id}?productId=${product.product.id}&quanlity=1&size=${product.size}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
        },
        mode: "cors",
        data: "",
      }).then(function (response) {
        if (response.status == 200) {
          props.deleteProduct(product);
          setIsDelete(!isDelete);
        }
        //  else {
        //    toast.error("xảy ra lỗi!", {
        //      className: "Thông báo",
        //    });
        //  }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const increState = async (product) => {
    const cartProduct = props.cart.find(
      (item) =>
        item.product.id == product.product.id && product.size == item.size
    );
    console.log(cartProduct);
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      // const response = await axios.put(
      //   `/api/cart/${user.id}?productId=${cartProduct.product.id}&quanlity=1&size=${cartProduct.size}&type=1`
      // );
      // if (response.status == 200) {
      //   props.increaProduct(product);
      //   setIsDelete(!isDelete);
      // }

      await axios({
        method: "put",
        maxBodyLength: Infinity,
        url: `/api/cart/${user.id}?productId=${cartProduct.product.id}&quanlity=1&size=${cartProduct.size}&type=1`,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
        },
        mode: "cors",
        data: "",
      }).then(function (response) {
        if (response.status == 200) {
          props.increaProduct(product);
          setIsDelete(!isDelete);
        }
        //  else {
        //    toast.error("xảy ra lỗi!", {
        //      className: "Thông báo",
        //    });
        //  }
      });
    } catch (error) {}
  };
  const decreState = async (product) => {
    const cartProduct = props.cart.find(
      (item) =>
        item.product.id == product.product.id && product.size == item.size
    );
    console.log(cartProduct);
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      // const response = await axios.put(
      //   `/api/cart/${user.id}?productId=${cartProduct.product.id}&quanlity=1&size=${cartProduct.size}&type=-1`
      // );
      // if (response.status == 200) {
      //   props.decreaProduct(product);
      //   setIsDelete(!isDelete);
      // }

      await axios({
        method: "put",
        maxBodyLength: Infinity,
        url: `/api/cart/${user.id}?productId=${cartProduct.product.id}&quanlity=1&size=${cartProduct.size}&type=-1`,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
        },
        mode: "cors",
        data: "",
      }).then(function (response) {
        if (response.status == 200) {
          props.decreaProduct(product);
          setIsDelete(!isDelete);
        }
        //  else {
        //    toast.error("xảy ra lỗi!", {
        //      className: "Thông báo",
        //    });
        //  }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = (cart) => {
    var total = 0;
    cart.map((item) => {
      total += item.product.price * item.quanlity;
    });
    return total;
  };

  const handleOrder = () => {
    if (props.cart.length == 0) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ để đặt hàng");
    } else {
      navigate("/order");
    }
  };

  const DrawerList = (
    <Box sx={{ width: isMobile ? 300 : 450 }} role="presentation">
      <div class="container-head-cart justify-content-between d-flex">
        <div>
          <span class="cart-title">Giỏ Hàng</span>
          <span className={"badge rounded-pill bg-dark cart-number "}>
            {props.cart.length}
          </span>
        </div>
        <div>
          <button className={"btn btn-icon"} onClick={toggleDrawer(false)}>
            <CloseIcon></CloseIcon>
          </button>
        </div>
      </div>
      <Divider />

      <div className={"list-product"}>
        {props.cart.map((item) => {
          return (
            <div className="product-card">
              <img src={item.product.image} alt={"Sản phẩm"} />
              <div className="product-details">
                <h3 className={"product-name"}>{item.product.name}</h3>
                <div className={"product-infor"}>
                  <p>Size: {item.size}</p>
                </div>
                <div className={"sub-product d-flex justify-content-between"}>
                  <div class="infor-price-quanlity">
                    <button
                      class="price-quantity"
                      onClick={() => {
                        increState(item);
                      }}
                    >
                      +
                    </button>
                    <input value={item.quanlity} readOnly />
                    <button
                      class="price-quantity icon-sub"
                      onClick={() => {
                        decreState(item);
                      }}
                    >
                      -
                    </button>
                  </div>

                  <div class="product-price">
                    <span>
                      {item.product.price.toLocaleString("vi-VN")} VND
                    </span>
                  </div>

                  <div>
                    <button
                      className={"btn btn-danger"}
                      onClick={() => deleteSate(item)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-card">
          <img
            src={
              "https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/12097bc53987beb388e573c8b0bbba92.JPG"
            }
            alt={"Sản phẩm"}
          />
          <div className="product-details">
            <h3 className={"product-name"}>
              Sản phẩm này đẹp lắm luôn nè các bạn
            </h3>
            <div className={"product-infor"}>
              <p>Màu sắc: Ghi sáng</p>
              <p>Size: XL</p>
            </div>
            <div className={"sub-product d-flex justify-content-between"}>
              <div class="infor-price-quanlity">
                <button class="price-quantity">+</button>
                <input value={10} readOnly />
                <button class="price-quantity icon-sub">-</button>
              </div>

              <div class="product-price">
                <span>1.200.000 VND</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Divider />
      <div className={"d-flex justify-content-end total-price"}>
        <span>
          Tổng cộng:{" "}
          <strong>
            {calculateTotalPrice(props.cart).toLocaleString("vi-VN")} VND
          </strong>
        </span>
      </div>
      <Divider />
      {/* <div className={"wrap-btn-cart"}>
        <button type="button" class="btn btn-outline-dark btn-cart">
          Xem Giỏ Hàng
        </button>
      </div> */}

      <div className={"wrap-btn-cart"}>
        {sessionStorage.getItem("user") == null && (
          <button
            type="button"
            class="btn btn-outline-dark btn-cart"
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng Nhập
          </button>
        )}

        {sessionStorage.getItem("user") != null && (
          <button
            type="button"
            class="btn btn-outline-dark btn-cart"
            onClick={() => {
              handleOrder();
            }}
          >
            Đặt hàng
          </button>
        )}
      </div>
    </Box>
  );

  return (
    <div>
      <div class="cart">
        <Button class="btn btn-icon" onClick={toggleDrawer(true)}>
          <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>
          <span class="badge bg-dark">{props.cart.length}</span>
        </Button>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"}>
        {DrawerList}
      </Drawer>

      <ToastContainer position="bottom-left" style={{ zIndex: 99999 }} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cartAr,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (product_current) =>
      dispatch(deleteProduct(product_current)),
    increaProduct: (product_current) => {
      dispatch(increaProduct(product_current));
    },
    decreaProduct: (product_current) => {
      dispatch(decreaProduct(product_current));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
