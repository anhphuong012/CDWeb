import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "../ManagerProduct/managerProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./order.css";

import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { auto, end, right } from "@popperjs/core";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";

import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Người đặt", minWidth: 170 },
  {
    id: "dateCreate",
    label: "Ngày đặt",
    minWidth: 180,
    align: "left",
  },
  {
    id: "price",
    label: "Tổng tiền",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("vi-VN"),
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("vi-VN"),
  },
  {
    id: "function",
    label: "Chức năng",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

export default function ManagerOrderCancel() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);

  const [show, setShow] = useState(false);

  const [selectShow, setSelectShow] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (selectShow) => {
    setShow(true);
    setSelectShow(selectShow);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(`/api/order?status=-1`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        setTemp(response.data.data);
        console.log(data);
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      navigate("/login");
    } else {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user.role != 0) {
        navigate("/");
      } else {
        fetchData();
        setIsLoad(true);
      }
    }

    // fetchData();
    // setIsLoad(true);
  }, []);

  const convertDate = (dateStr) => {
    const dateAndTime = dateStr.split("T");
    const Time = dateAndTime[1];
    const date = dateAndTime[0].split("-");
    return Time + " " + date[2] + "-" + date[1] + "-" + date[0];
  };
  return (
    <div className="container-main mb-5">
      <HeaderAdmin></HeaderAdmin>
      {!isLoad && (
        <Box sx={{ marginTop: "7rem", width: "100%", margin: auto }}>
          <CircularProgress />
        </Box>
      )}
      {isLoad && (
        <div className="main-content">
          <h3 className="title-manager">Đơn hàng đã hủy</h3>
          <div className="container-form-search ">
            <div className="mb-4 wrap-btn-add"></div>
          </div>
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Thông tin
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      Chức năng
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data != null &&
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.id}
                          >
                            {/* {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })} */}
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.user.email}</TableCell>
                            <TableCell align="left">
                              {convertDate(row.dateCreate)}
                            </TableCell>
                            <TableCell align="left">
                              {row.totalPrice.toLocaleString("vi-VN")} VNĐ
                            </TableCell>
                            <TableCell align="left">
                              <span class="badge bg-danger">Đã hủy</span>
                            </TableCell>
                            <TableCell align="left">
                              <button
                                className={"btn btn-info mr-2"}
                                title="Xem"
                                onClick={() => {
                                  handleShow(row);
                                }}
                              >
                                <RemoveRedEyeIcon></RemoveRedEyeIcon>
                              </button>

                              <div
                                className="modal show"
                                style={{
                                  display: "block",
                                  position: "initial",
                                }}
                              ></div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data != null ? data.length : 10}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}

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
  );
}
