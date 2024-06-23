import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "./ManagerUser.css";
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
import { auto, end, right } from "@popperjs/core";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Tên tài khoản", minWidth: 170 },
  {
    id: "email",
    label: "email",
    minWidth: 120,
    align: "left",
  },
  {
    id: "phone",
    label: "phone",
    minWidth: 170,
    align: "left",
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
  const [isLoad, setIsLoad] = useState(false);

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
    const response = await axios.get("/api/user/all", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token").toString()}`,
      },
    });

    if (response.status === 200) {
      if (response.data.data != null) {
        setData(response.data.data);
        setTemp(response.data.data);
        console.log(data);
      }
    }
  };

  useEffect(() => {
    if (value == "") {
      setData(temp);
    } else {
      const updateData = data.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      setData(updateData);
    }
  }, [value]);

  useEffect(() => {
    fetchData();
    setIsLoad(true);
  }, []);
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
          <h3 className="title-manager">Quản lí tài khoản</h3>
          <div className="container-form-search ">
            <div className="mb-4 wrap-btn-add"></div>
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
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Tài khoản
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
                            <TableCell align="left">{row.username}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left">
                              <button
                                className={"btn btn-info mr-2"}
                                title="Sửa"
                                onClick={() => {
                                  window.location.href = `/admin/user/edit/${row.id}`;
                                }}
                              >
                                <EditIcon></EditIcon>
                              </button>

                              {/* <button
                                                                className={"btn btn-danger"}
                                                                title="Xóa"
                                                                onClick={() => {
                                                                    handleShow(row.id);
                                                                }}
                                                            >
                                                                <DeleteForeverIcon></DeleteForeverIcon>
                                                            </button> */}

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
          {/* <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thông báo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Bạn Có Chắn Chắc Muốn Xóa Sản Phẩm Này Không?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Trở Lại
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Xóa
                            </Button>
                        </Modal.Footer>
                    </Modal> */}
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
