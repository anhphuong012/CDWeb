import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
import "./managerProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useState, useEffect } from "react";
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
        console.log(data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container-main">
      <HeaderAdmin></HeaderAdmin>

      <div className="main-content">
        <h3 className="title-manager">Quản lí sản phẩm</h3>
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
        <div style={{ textAlign: end }}>
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
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </Box>
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
                            <button className={"btn btn-info mr-2"} title="Sửa">
                              <EditIcon></EditIcon>
                            </button>
                            <button className={"btn btn-danger"} title="Xóa">
                              <DeleteForeverIcon></DeleteForeverIcon>
                            </button>
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
    </div>
  );
}
