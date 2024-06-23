import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./order.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CircularProgress from "@mui/material/CircularProgress";

export default function History() {
  const [data, setData] = useState(null);

  const [show, setShow] = useState(false);
  const [selectShow, setSelectShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    } else {
      var user = JSON.parse(sessionStorage.getItem("user"));
      console.log(user);
      fetchData(user.id);
    }
  }, []);

  const fetchData = async (userId) => {
    const response = await axios.get(`/api/order/${userId}`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        console.log(data);
      }
    }
  };

  const convertDate = (dateStr) => {
    const dateAndTime = dateStr.split("T");
    const Time = dateAndTime[1];
    const date = dateAndTime[0].split("-");
    return Time + " " + date[2] + "-" + date[1] + "-" + date[0];
  };
  console.log(data);

  const handleClose = () => setShow(false);

  const handleShow = (selectShow) => {
    setShow(true);
    setSelectShow(selectShow);
  };

  const changeStatus = async (orderId) => {
    // const response = await axios.put(`/api/order?status=1&orderId=${orderId}`);
    // if (response.status == 200) {
    //   if (response.data.data != null) {
    //     const updateData = data.filter((item) => item.id != orderId);
    //     setData(updateData);
    //     toast.success("Chấp nhận thành công");
    //   }
    // }

    await axios({
      method: "put",
      maxBodyLength: Infinity,
      url: `/api/order?status=-1&orderId=${orderId}`,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
      },
      mode: "cors",
      data: "",
    }).then(function (response) {
      if (response.status == 200) {
        const updateData = data.map((item) => {
          if (item.id === orderId) {
            return { ...item, status: -1 };
          }
          return item;
        });
        setData(updateData);
        toast.success("Hủy thành công");
      }
    });
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
          <h2 className="text-center mt-2 text-bg-dark p-2">Đơn đã đặt</h2>
          <div className="container ">
            <table id="cart" className="table table-hover table-condensed">
              <thead>
                <tr>
                  <th style={{ width: "30%", textAlign: "left" }}>
                    ID <span style={{ marginLeft: "30%" }}>Ngày đặt</span>
                  </th>
                  <th style={{ width: "15%" }}>Tổng tiền</th>
                  <th style={{ width: "20%%" }}>Hình thức thanh toán</th>
                  <th style={{ width: "20%" }} className="text-center">
                    Trạng thái
                  </th>
                  <th style={{ width: "15%" }}> </th>
                </tr>
              </thead>
              <tbody className="">
                {data != null &&
                  data.map((item) => {
                    return (
                      <tr>
                        <td data-th="Product">
                          <div className="row">
                            <div className="col-sm-2 hidden-xs">
                              {/* <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="img-responsive"
                              width={100}
                            /> */}
                              <span> {item.id}</span>
                            </div>
                            <div className="col-sm-10">
                              {/* <h4 className="nomargin title-product">
                              {item.id}
                            </h4> */}
                              <p>{convertDate(item.dateCreate + " ")}</p>
                            </div>
                          </div>
                        </td>
                        <td data-th="Price" className="ml-3">
                          {item.totalPrice.toLocaleString("vi-VN")} VNĐ
                        </td>
                        <td data-th="Quantity">
                          <div class="">{item.typePayment}</div>
                        </td>

                        <td data-th="Status">
                          {item.status == 0 && (
                            <div class="">
                              <span class="badge bg-primary">Chờ xác nhận</span>
                            </div>
                          )}
                          {item.status == 1 && (
                            <span class="badge bg-info">Đang vận chuyển</span>
                          )}
                          {item.status == 2 && (
                            <div class="">
                              <span class="badge bg-success">
                                Đã hoàn thành
                              </span>
                            </div>
                          )}
                          {item.status == -1 && (
                            <div class="">
                              <span class="badge bg-danger">Đã hủy</span>
                            </div>
                          )}
                        </td>
                        <td className="actions" data-th="">
                          <button
                            className="btn btn-primary btn-sm"
                            fdprocessedid="0h411qi"
                            onClick={() => {
                              handleShow(item);
                            }}
                          >
                            <RemoveRedEyeIcon></RemoveRedEyeIcon>
                          </button>

                          {item.status == 0 && (
                            <button
                              className="ml-2 btn btn-danger btn-sm"
                              fdprocessedid="0h411qi"
                              onClick={() => {
                                changeStatus(item.id);
                              }}
                            >
                              <DeleteIcon></DeleteIcon>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <a href="/" className="btn btn-warning">
                      <i className="fa fa-angle-left" /> Tiếp tục mua hàng
                    </a>
                  </td>
                  <td colSpan={2} className="hidden-xs">
                    {" "}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>

        {selectShow != null && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thông tin đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Mã đơn hàng: {selectShow.id}</div>
              <div className="roll-infor mt-3">
                {selectShow.orderItems.map((item, index) => {
                  return (
                    <div className="">
                      <span>{index + 1}</span>
                      <span style={{ marginLeft: "10px" }}>
                        {item.product.name}
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        {" "}
                        SL:{item.quanlity}
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        {" "}
                        {item.product.price.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3">
                <strong> Địa chỉ:</strong> {selectShow.address}
              </div>
              <div className="mt-3">
                <strong> Hình thức thanh toán:</strong> {selectShow.typePayment}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Trở Lại
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <ToastContainer position="bottom-right" />
      </div>
      <Footer></Footer>
    </div>
  );
}
