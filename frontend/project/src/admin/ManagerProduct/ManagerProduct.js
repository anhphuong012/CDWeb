import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "./managerProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { end, right } from "@popperjs/core";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Tên Sản Phẩm", minWidth: 170 },
  {
    id: "image",
    label: "Hình ảnh",
    minWidth: 120,
    align: "left",
    format: (value) => value.toLocaleString("vi-VN"),
  },
  {
    id: "price",
    label: "Giá",
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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function ManagerProduct() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);

  const [show, setShow] = useState(false);

  const [selectDelete, setSelectDelete] = useState(null);

  //Lọc sản phẩm
  const [value, setValue] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setSelectDelete(id);
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
    const response = await axios.get(`/api/products`);

    if (response.status == 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        setTemp(response.data.data);
        console.log(data);
      }
    }
  };

  const handleDelete = async () => {
    console.log("ID:" + selectDelete);
    await axios({
      method: "delete",
      maxBodyLength: Infinity,
      url: "/api/products/product/" + selectDelete,

      data: "",
    }).then(function (response) {
      console.log(response);
      if (response.status == 200) {
        if (response.data.data == true) {
          const updatedProducts = data.filter(
            (product) => product.id !== selectDelete
          );
          setData(updatedProducts);
          setTemp(updatedProducts);

          toast.success("Xóa Sản Phẩm Thành Công!", {
            className: "Thông báo",
          });
        }
        setShow(false);
      }
    });
  };

  useEffect(() => {
    if (value == "") {
      setData(temp);
    } else {
      const updateData = data.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setData(updateData);
    }
  }, [value]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-main mb-5">
      <HeaderAdmin></HeaderAdmin>

      <div className="main-content">
        <h3 className="title-manager">Quản lí sản phẩm</h3>
        <div className="container-form-search ">
          <div className="mb-4 wrap-btn-add">
            <button
              className={"btn btn-primary"}
              onClick={() => {
                navigate("/admin/products/add");
              }}
            >
              Thêm sản phẩm
            </button>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-size-small"
                label="Lọc"
                variant="outlined"
                size="small"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            </Box>
          </div>
        </div>
        <Paper sx={{ width: "100%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                {/* <TableRow>
                  <TableCell align="left" style={{ top: 57, minWidth: 50 }}>
                    ID
                  </TableCell>
                  <TableCell align="left" style={{ top: 57, minWidth: 170 }}>
                    Tên Sản Phẩm
                  </TableCell>
                  <TableCell align="right" style={{ top: 57, minWidth: 170 }}>
                    Hình ảnh
                  </TableCell>
                  <TableCell align="right" style={{ top: 57, minWidth: 170 }}>
                    Giá
                  </TableCell>
                  <TableCell align="right" style={{ top: 57, minWidth: 170 }}>
                    Chức năng
                  </TableCell>
                </TableRow> */}
                {/* <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow> */}
                {/* <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Country
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Details
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Sản Phẩm
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">
                            <img
                              src={row.image}
                              className="image-product"
                              alt={row.name}
                            ></img>
                          </TableCell>
                          <TableCell align="left">
                            {row.price.toLocaleString("vi-VN")} VNĐ
                          </TableCell>
                          <TableCell align="left">
                            <button
                              className={"btn btn-info mr-2"}
                              title="Sửa"
                              onClick={() => {
                                window.location.href = `/admin/products/edit/${row.id}`;
                              }}
                            >
                              <EditIcon></EditIcon>
                            </button>

                            <button
                              className={"btn btn-danger"}
                              title="Xóa"
                              onClick={() => {
                                handleShow(row.id);
                              }}
                            >
                              <DeleteForeverIcon></DeleteForeverIcon>
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Bạn Có Chắn Chắc Muốn Xóa Sản Phẩm Này Không?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Trở Lại
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
