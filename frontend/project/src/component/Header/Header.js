import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../image/logo.png";
import Search from "./Search";
import "./search.css";
import "./header.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import axios from "axios";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
const Header = () => {
  const [value, setValue] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const onChangeHandle = async (value) => {
    console.log(value);

    if (value == "") {
      setList([]);
    } else {
      const response = await axios.get(`/api/products?name=${value}`);

      if (response.status == 200) {
        if (response.data.data != null) {
          setList(response.data.data);
          console.log(list);
        }
      }
    }
  };

  useEffect(() => {
    onChangeHandle(value);
  }, [value]);

  console.log(list);
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
                    <a class="dropdown-item" href="/category/1">
                      Toàn bộ
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/category/1">
                      Áo
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/category/2">
                      Quần
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
                    <a class="dropdown-item" href="/category/6">
                      Toàn bộ
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/category/3">
                      Áo
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/category/4">
                      Quần
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/category/6">
                      Váy - Đầm
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="/category/5">
                      Set bộ
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
                    <a class="dropdown-item" href="/category/7">
                      Toàn bộ
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/category/7">
                      Áo
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/category/8">
                      Quần
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
            <div class="input-group search">
              {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}

              <input
                type="text"
                class="form-control  none-bd-r"
                placeholder="Bạn cần tìm gì..."
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                value={value}
              ></input>

              <button
                class="btn-search"
                onClick={() => {
                  var urlValue = value == "" ? "all" : value;
                  document.location.href = `/search/${urlValue}`;
                }}
              >
                <SearchOutlinedIcon></SearchOutlinedIcon>
              </button>
              {list.length > 0 && (
                <div className="auto-complete">
                  {list.map((item) => {
                    return (
                      <a href={`/detail/${item.id}`} className="wrap-item">
                        <div className="item">
                          <div>
                            <img
                              className="image"
                              src={item.image}
                              alt="Hình"
                            />
                          </div>
                          <div className="name">
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <button className={"btn btn-icon ml-2"}>
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
