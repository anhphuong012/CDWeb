import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./order.css";
import {
  deleteProduct,
  increaProduct,
  decreaProduct,
  clearCart,
} from "../../actions/action";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

function Order(props) {
  const [isDelete, setIsDelete] = useState(false);

  //Value de xet hinh thuc thanh toan
  const [value, setValue] = useState("direct");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    }
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const order = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (value == "direct") {
        // const response = await axios.post(`/api/order/${user.id}`);
        // if (response.status == 200) {
        //   sessionStorage.setItem("cart", []);
        //   clearCart();
        //   setIsDelete(!isDelete);
        //   // navigate("/order/history");
        //   document.location.href = "/order/history";
        // }

        await axios({
          method: "post",
          maxBodyLength: Infinity,
          url: `/api/order/${user.id}`,

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
            sessionStorage.setItem("cart", []);
            clearCart();
            setIsDelete(!isDelete);
            // navigate("/order/history");
            console.log(sessionStorage
              .getItem("token")
              .toString());
            document.location.href = "/order/history";
          }
          //  else {
          //    toast.error("xảy ra lỗi!", {
          //      className: "Thông báo",
          //    });
          //  }
        });
      } else {
        // const response = await axios.post(
        //   `/api/payment/create?amount=${calculateTotalPrice(props.cart)}`
        // );
        // if (response.status == 200) {
        //   document.location.href = response.data.data;
        // } else {
        //   toast.error("Lỗi vui lòng chọn thanh toán trực tiêp!", {
        //     className: "Thông báo",
        //   });
        // }

        await axios({
          method: "post",
          maxBodyLength: Infinity,
          url: `/api/payment/create?amount=${calculateTotalPrice(props.cart)}`,

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
            document.location.href = response.data.data;
          } else {
            toast.error("Lỗi vui lòng chọn thanh toán trực tiêp!", {
              className: "Thông báo",
            });
          }
        });
      }
    } catch (error) { }
  };

  // const deleteSate = async (product) => {
  //   try {
  //     const user = JSON.parse(sessionStorage.getItem("user"));
  //     const response = await axios.delete(
  //       `/api/cart/${user.id}?productId=${product.product.id}&quanlity=1&size=${product.size}`
  //     );
  //     if (response.status == 200) {
  //       props.deleteProduct(product);
  //       setIsDelete(!isDelete);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const increState = async (product) => {
  //   const cartProduct = props.cart.find(
  //     (item) =>
  //       item.product.id == product.product.id && product.size == item.size
  //   );
  //   console.log(cartProduct);
  //   try {
  //     const user = JSON.parse(sessionStorage.getItem("user"));
  //     const response = await axios.put(
  //       `/api/cart/${user.id}?productId=${cartProduct.product.id}&quanlity=1&size=${cartProduct.size}&type=1`
  //     );
  //     if (response.status == 200) {
  //       props.increaProduct(product);
  //       setIsDelete(!isDelete);
  //     }
  //   } catch (error) {}
  // };
  // const decreState = async (product) => {
  //   const cartProduct = props.cart.find(
  //     (item) =>
  //       item.product.id == product.product.id && product.size == item.size
  //   );
  //   console.log(cartProduct);
  //   try {
  //     const user = JSON.parse(sessionStorage.getItem("user"));
  //     const response = await axios.put(
  //       `/api/cart/${user.id}?productId=${cartProduct.product.id}&quanlity=1&size=${cartProduct.size}&type=-1`
  //     );
  //     if (response.status == 200) {
  //       props.decreaProduct(product);
  //       setIsDelete(!isDelete);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
    } catch (error) { }
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
  return (
    <div>
      <Header></Header>
      <div
        style={{ marginTop: "7rem", marginBottom: "7rem" }}
        className="container"
      >
        <>
          {/* Hello world */}
          <h2 className="text-center mt-2 text-bg-dark p-2">Đặt hàng</h2>
          <div className="container ">
            <table id="cart" className="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Tên sản phẩm</th>
                  <th style={{ width: "10%" }}>Giá</th>
                  <th style={{ width: "8%" }}>Số lượng</th>
                  <th style={{ width: "22%" }} className="text-center">
                    Thành tiền
                  </th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody className="">
                {props.cart.map((item) => {
                  return (
                    <tr>
                      <td data-th="Product">
                        <div className="row">
                          <div className="col-sm-2 hidden-xs">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="img-responsive"
                              width={100}
                            />
                          </div>
                          <div className="col-sm-10">
                            <h4 className="nomargin title-product">
                              {item.product.name}
                            </h4>
                            <p>Size:{item.size}</p>
                          </div>
                        </div>
                      </td>
                      <td data-th="Price">
                        {item.product.price.toLocaleString("vi-VN")} VNĐ
                      </td>
                      <td data-th="Quantity">
                        {/* <input
                      className="form-control text-center"
                      defaultValue={1}
                      type="number"
                      fdprocessedid="5i5z5"
                    /> */}
                        <div class="infor-price-quanlity">
                          <button
                            class="price-quantity"
                            onClick={() => {
                              increState(item);
                            }}
                          >
                            +
                          </button>
                          <input
                            className="input-quanlity "
                            value={item.quanlity}
                            readOnly
                          />
                          <button
                            class="price-quantity icon-sub"
                            onClick={() => {
                              decreState(item);
                            }}
                          >
                            -
                          </button>
                        </div>
                      </td>
                      <td data-th="Subtotal" className="text-center">
                        {(item.product.price * item.quanlity).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        VNĐ
                      </td>
                      <td className="actions" data-th="">
                        <button
                          className="btn btn-danger btn-sm"
                          fdprocessedid="0h411qi"
                          onClick={() => deleteSate(item)}
                        >
                          <DeleteIcon></DeleteIcon>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="visible-xs">
                  <td className="text-center">
                    <strong>Hình thức thanh toán:</strong>
                  </td>
                  <td colSpan={5}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="direct"
                        control={<Radio />}
                        label="Trực tiếp"
                      />
                      <FormControlLabel
                        value="online"
                        control={<Radio />}
                        label="Thông qua VNPay"
                      />
                    </RadioGroup>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a
                      href="http://hocwebgiare.com/"
                      className="btn btn-warning"
                    >
                      <i className="fa fa-angle-left" /> Tiếp tục mua hàng
                    </a>
                  </td>
                  <td colSpan={2} className="hidden-xs">
                    {" "}
                  </td>
                  <td className="hidden-xs text-center">
                    <strong>Tổng tiền:</strong>{" "}
                    {calculateTotalPrice(props.cart).toLocaleString("vi-VN")}{" "}
                    VND
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-block"
                      onClick={() => {
                        order();
                      }}
                    >
                      Thanh toán <i className="fa fa-angle-right" />
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
        <ToastContainer position="bottom-right" />
      </div>
      <Footer></Footer>
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
    clearCart: () => {
      dispatch(clearCart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
