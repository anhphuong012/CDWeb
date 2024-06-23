import "../css/sb-admin-2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./headerAdmin.css";
// // import "jquery";
import "jquery.easing";
import { useState, useEffect } from "react";

import { Helmet } from "react-helmet";

import logo1 from "../img/undraw_profile.svg";
import logo2 from "../img/undraw_profile_1.svg";
import logo3 from "../img/undraw_profile_2.svg";
import logo4 from "../img/undraw_profile_3.svg";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import logo from "../img/undraw_rocket.svg";
import { useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
export default function HeaderAdmin() {
  const [isSelect, setIsSelect] = useState("product");

  const navigate = useNavigate();

  useEffect(() => { }, []);

  return (
    //  id="wrapper"
    <div>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>
        {/* Divider */}
        {/* <hr className="sidebar-divider my-0" /> */}
        {/* Nav Item - Infor */}
        {/* <li className="nav-item active">
          <a className="nav-link" href="index.html">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Thông tin</span>
          </a>
        </li> */}
        {/* Divider */}
        {/* <hr className="sidebar-divider" /> */}

        {/* Nav Item - Quan li san pham */}
        <li className={`nav-item ${isSelect == "product" ? "active" : ""}`}>
          <button
            className="nav-link"
            onClick={() => {
              navigate("/admin/products");
              setIsSelect("product");
            }}
          >
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Quản lí sản phẩm</span>
          </button>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Nav Item - Quan li don hang */}
        {/* <li className={`nav-item ${isSelect == "order" ? "active" : ""}`}>
          <button
            className="nav-link"
            onClick={() => {
              navigate("/admin/products");
              setIsSelect("order");
            }}
          >
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Quản lí đơn hàng</span>
          </button>
        </li> */}
        <li className="nav-item">
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon className="text-left" />}
              aria-controls="panel1-content"
              id="panel1-header"
              className="collabse-drow"
            >
              <Typography className="text-left">Quản lí đơn hàng</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <button
                  className={`nav-link `}
                  onClick={() => {
                    navigate("/admin/orders/accept");
                    setIsSelect("accept");
                  }}
                >
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span
                    className={`collabse-drow-item ${isSelect == "accept" ? "active-nav" : ""
                      }`}
                  >
                    Đơn chờ xác nhận
                  </span>
                </button>
                <hr style={{ borderTop: "1px solid rgba(0, 0, 0, .3);" }} />
                <button
                  className={`nav-link `}
                  onClick={() => {
                    navigate("/admin/orders/move");
                    setIsSelect("move");
                  }}
                >
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span
                    className={`collabse-drow-item ${isSelect == "move" ? "active-nav" : ""
                      }`}
                  >
                    Đơn đang vận chuyển
                  </span>
                </button>
                <hr style={{ borderTop: "1px solid rgba(0, 0, 0, .30);" }} />
                <button
                  className={`nav-link `}
                  onClick={() => {
                    navigate("/admin/orders/finish");
                    setIsSelect("finish");
                  }}
                >
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span
                    className={`collabse-drow-item ${isSelect == "finish" ? "active-nav" : ""
                      }`}
                  >
                    Đơn đã hoàn thành
                  </span>
                </button>
                <hr style={{ borderTop: "1px solid rgba(0, 0, 0, .30);" }} />
                <button
                  className={`nav-link `}
                  onClick={() => {
                    navigate("/admin/orders/cancel");
                    setIsSelect("cancel");
                  }}
                >
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span
                    className={`collabse-drow-item ${isSelect == "cancel" ? "active-nav" : ""
                      }`}
                  >
                    Đơn đã hủy
                  </span>
                </button>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Nav Item - Quan li user */}
        <li className={`nav-item ${isSelect == "user" ? "active" : ""}`}>
          <button
            className="nav-link"
            onClick={() => {
              navigate("/admin/user");
              setIsSelect("user");
            }}
          >
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Quản lí user</span>
          </button>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        {/* <div className="sidebar-heading">Interface</div> */}

        <li className={`nav-item ${isSelect == "out" ? "active" : ""}`}>
          <button
            className="nav-link"
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
              setIsSelect("out");
            }}
          >
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Đăng xuất</span>
          </button>
        </li>

        {/*
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseUtilities"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i className="fas fa-fw fa-wrench" />
            <span>Utilities</span>
          </a>
          <div
            id="collapseUtilities"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Utilities:</h6>
              <a className="collapse-item" href="utilities-color.html">
                Colors
              </a>
              <a className="collapse-item" href="utilities-border.html">
                Borders
              </a>
              <a className="collapse-item" href="utilities-animation.html">
                Animations
              </a>
              <a className="collapse-item" href="utilities-other.html">
                Other
              </a>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Addons</div>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i className="fas fa-fw fa-folder" />
            <span>Pages</span>
          </a>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <a className="collapse-item" href="login.html">
                Login
              </a>
              <a className="collapse-item" href="register.html">
                Register
              </a>
              <a className="collapse-item" href="forgot-password.html">
                Forgot Password
              </a>
              <div className="collapse-divider" />
              <h6 className="collapse-header">Other Pages:</h6>
              <a className="collapse-item" href="404.html">
                404 Page
              </a>
              <a className="collapse-item" href="blank.html">
                Blank Page
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <i className="fas fa-fw fa-chart-area" />
            <span>Charts</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <i className="fas fa-fw fa-table" />
            <span>Tables</span>
          </a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div> */}
      </ul>

      {/* <div id="content-wrapper" class="d-flex flex-column">
        <div id="content"> */}
      <>
        {/* Topbar */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow navbar-1">
          {/* Sidebar Toggle (Topbar) */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars" />
          </button>

          {/* Topbar Navbar */}
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block" />
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  Douglas McGee
                </span>
                <img className="img-profile rounded-circle" src={logo1} />
              </a>
              {/* Dropdown - User Information */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                  Activity Log
                </a>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </>
      {/* </div>
      </div> */}

      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
          rel="stylesheet"
        />
        {/* <script src="./vendor/jquery/jquery.min.js"></script>
        <script src="./vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

        <script src="./vendor/jquery-easing/jquery.easing.min.js"></script>

        <script src="./js/sb-admin-2.min.js"></script> */}
      </Helmet>
    </div>
  );
}
