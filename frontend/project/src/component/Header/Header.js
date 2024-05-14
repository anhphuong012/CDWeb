import React, { useState, Component } from "react";

import "./header.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../image/logo.png";
import Search from "./Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";

import Cart from "./Cart";
const Header = () => {
  return (
    <div className={"header-fixed"}>
      <nav class="navbar navbar-expand-sm bg-white navbar-light d-flex justify-content-between">
        <div class="container mb-2 mt-2  boder-bot ">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse flex-grow-none"
            id="collapsibleNavbar"
          >
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Nam
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Toàn bộ
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Áo
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Quần
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Giày dép
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Nữ
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Toàn bộ
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Áo
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Quần
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Váy - Đầm
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Set bộ
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Áo dài
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Trẻ em
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Toàn bộ
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Áo
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Quần
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Giày dép
                    </a>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">
                  Phụ kiện
                </a>
              </li>

              {/** Navbar */}
            </ul>
          </div>
          <div>
            <Link className="site-brand logo" to={"/"}>
              <img
                src="https://pubcdn.ivymoda.com/ivy2/images/logo.png"
                alt="Áo - Quần IVy moda"
              />
            </Link>
          </div>

          <div class="right-component">
            <Search></Search>

            <button class="btn btn-icon ml-2">
              <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
            </button>

            <Cart></Cart>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
