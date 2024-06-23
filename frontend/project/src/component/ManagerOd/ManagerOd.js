import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UserMenu from "../UserMenu/UserMenu";
import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManagerOd.css"

import { ToastContainer, toast } from "react-toastify";

export default function ManagerOd() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [orderStatus, setOrderStatus] = useState("")
    const navigate = useNavigate();



    useEffect(() => {
        if (sessionStorage.getItem("user") == null) {
            navigate("/login");
        } else {
            var user = JSON.parse(sessionStorage.getItem("user"));
            console.log(user);
            fetchData(user.id, orderStatus);
        }
    }, [orderStatus]);

    const fetchData = async (userId, status) => {
        let all = `/api/order/${userId}`;

        if (status) {
            all += `/${status}`;
        }

        const response = await axios.get(all);

        if (response.status == 200) {
            if (response.data.data != null) {
                setData(response.data.data);
                console.log(response.data.data);
            }
        }
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
                const updateData = data.filter((item) => item.id != orderId);
                setData(updateData);
                toast.success("Chấp nhận thành công");
            }
            //  else {
            //    toast.error("xảy ra lỗi!", {
            //      className: "Thông báo",
            //    });
            //  }
        });
    };

    const convertDate = (dateStr) => {
        const dateAndTime = dateStr.split("T");
        const Time = dateAndTime[1];
        const date = dateAndTime[0].split("-");
        return Time + " " + date[2] + "-" + date[1] + "-" + date[0];
    };

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };

    return (
        <div>
            <Header></Header>
            <div className="container_customer">
                <div className="col-lg-4 col-xl-auto">
                    <UserMenu></UserMenu>
                </div>
                <div class="col-lg-8 col-xl">
                    <div class="order-block__title">
                        <h2>TÀI KHOẢN CỦA TÔI</h2>
                        <div class="form-group">
                            <label> Trạng thái đơn hàng:</label>
                            <select class="form-control rounded ng-valid ng-dirty ng-valid-parse ng-empty ng-touched"
                                value={orderStatus} onChange={handleStatusChange}>
                                <option value="all" selected="selected">
                                    Tất cả
                                </option>
                                <option value="0">Đơn đang chờ xác nhận</option>
                                <option value="1">Đơn đang giao</option>
                                <option value="2">Đơn đã nhận</option>
                                <option value="-1">Đơn đã hủy</option>

                            </select>
                        </div>
                    </div>

                    {/*  */}
                    <div className="container ">
                        <table id="cart" className="table table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th style={{ width: "35%", textAlign: "left" }}>
                                        ID <span style={{ marginLeft: "32%" }}>Ngày đặt</span>
                                    </th>
                                    <th style={{ width: "15%" }}>Tổng tiền</th>
                                    <th style={{ width: "18%%" }}>Hình thức thanh toán</th>
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
                                                            <span> {item.id}</span>
                                                        </div>
                                                        <div className="col-sm-10">
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
                                                        onClick={() => navigate(`/customer/order-detail/${item.id}`)}
                                                    >
                                                        <RemoveRedEyeIcon></RemoveRedEyeIcon>
                                                    </button>

                                                    {item.status === -1 ? null : (
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
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>

    );
}