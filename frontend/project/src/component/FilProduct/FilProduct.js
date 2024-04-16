import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Button, Collapse } from "react-bootstrap";
import Card from "../HomePage/CardProduct";
import RangeSlider from "react-range-slider-input";

import "react-range-slider-input/dist/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import $ from "jquery";
import "./product.css";

import Link from "@mui/material/Link";

export default function FilProduct() {
  const [open, setOpen] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("orange");
  const [price, setPrice] = useState({ min: 0, max: 1000000 });
  const [checkboxes, setCheckboxes] = useState({
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });

  const [value, setValue] = useState(10);

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxName]: !checkboxes[checkboxName],
    });
  };

  return (
    <div>
      <Header></Header>
      <section style={{ marginTop: "7rem", marginBottom: "7rem" }}>
        <div role="presentation" className="mb-3 breadcrum">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
        <div className="container d-flex mt-5">
          <div className="col-3">
            <h5>Lọc</h5>
            <div className="filter">
              <span>Theo Size:</span>

              <div className="row">
                <button
                  className={`btn-size mt-3  ${checkboxes.M ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("M")}
                >
                  M
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.L ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("L")}
                >
                  L
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.XL ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("XL")}
                >
                  XL
                </button>
                <button
                  className={`btn-size mt-3 ${checkboxes.XXL ? "click" : ""}`}
                  onClick={() => handleCheckboxChange("XXL")}
                >
                  XXL
                </button>
              </div>
            </div>

            <div className="filter mt-5">
              <span>Theo Giá:</span>

              <div className="row" style={{ paddingRight: "10%" }}>
                <RangeSlider
                  min={10}
                  max={10000000000}
                  defaultValue={[20, 10000000]}
                  onThumbDragStart={(value) => {
                    console.log(value);
                  }}
                />
              </div>
            </div>

            <div>
              <button className="btn-shop">Lọc</button>
              <button className="btn-shop ml">Bỏ Lọc</button>
            </div>
          </div>
          <div className="col-9 right-element">
            <div className="head">
              <h3>Áo Nam</h3>
              <div>
                <label>
                  <select
                    name="selectedFruit"
                    className="select-fil"
                    value={selectedFruit}
                    onChange={(e) => setSelectedFruit(e.target.value)}
                  >
                    <option value="apple">Sắp xếp theo</option>
                    <option value="default">Mặc định</option>
                    <option value="banana">Mới nhất</option>
                    <option value="red">Giá :Cao tới thấp</option>
                    <option value="orange">Giá :Thấp tới cao</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="row list-card mt-3">
              <Card
                title="What is Lorem Ipsum?"
                images="https://pubcdn.ivymoda.com/files/product/thumab/400/2024/03/22/467a20e0d092334cb796d81c30881d75.JPG"
                old_price="9,999"
                newPrice="9999"
                dollar="$"
                alt="batman"
                exp_date="10-08-2022"
                bg="bg-warning"
              />
              <Card
                title="What is Lorem Ipsum?"
                images="../images/blackpanter.png"
                old_price="599"
                newPrice="500"
                dollar="$"
                alt="blackpanter"
                exp_date="10-08-2022"
                bg="bg-warning"
              />
              <Card
                title="What is Lorem Ipsum?"
                images="../images/arthur.png"
                old_price="7999"
                newPrice="7000"
                dollar="$"
                alt="arthur"
                exp_date="10-08-2022"
                bg="bg-warning"
              />
              <Card
                title="What is Lorem Ipsum?"
                images="../images/kashima.png"
                old_price="999"
                newPrice="500"
                dollar="$"
                alt="kashima"
                exp_date="10-08-2022"
                bg="bg-warning"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}
