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

export default function History() {
  const [data, setData] = useState(null);
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
                          >
                            <RemoveRedEyeIcon></RemoveRedEyeIcon>
                          </button>

                          <button
                            className="ml-2 btn btn-danger btn-sm"
                            fdprocessedid="0h411qi"
                          >
                            <DeleteIcon></DeleteIcon>
                          </button>
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
        <ToastContainer position="bottom-right" />
      </div>
      <Footer></Footer>
    </div>
  );
}
